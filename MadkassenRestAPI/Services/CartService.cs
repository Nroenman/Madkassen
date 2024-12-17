using MadkassenRestAPI.Data;
using MadkassenRestAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using ClassLibrary;

public class CartService
{
    private readonly ApplicationDbContext _context;

    public CartService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddToCartAsync(int productId, int? userId, int quantity)
{
    var existingCartItem = await _context.CartItems
        .FirstOrDefaultAsync(ci => ci.ProductId == productId && ci.UserId == userId);

    var product = await _context.Produkter.FindAsync(productId);

    if (product == null)
    {
        throw new InvalidOperationException("Product not found.");
    }

    // Ensure there's enough stock to add to the cart
    if (product.StockLevel < quantity)
    {
        throw new InvalidOperationException("Not enough stock available.");
    }

    if (existingCartItem != null)
    {
        // If the product is already in the cart, just update the quantity
        existingCartItem.Quantity += quantity;
        _context.CartItems.Update(existingCartItem);
    }
    else
    {
        // If the product isn't in the cart, add a new cart item
        var cartItem = new CartItem
        {
            ProductId = productId,
            UserId = userId,  // Nullable for guest users
            Quantity = quantity,
            AddedAt = DateTime.UtcNow,
            ExpirationTime = DateTime.UtcNow.AddMinutes(30)  // Expire after 30 minutes
        };

        _context.CartItems.Add(cartItem);
    }

    // Decrease the stock level of the product by the quantity added to the cart
    product.StockLevel -= quantity;

    await _context.SaveChangesAsync();
}


    public async Task UpdateCartItemAsync(int productId, int? userId, int newQuantity)
{
    var cartItem = await _context.CartItems
        .FirstOrDefaultAsync(ci => ci.ProductId == productId && ci.UserId == userId);

    if (cartItem == null)
    {
        throw new InvalidOperationException("Cart item not found.");
    }

    var product = await _context.Produkter.FindAsync(productId);

    if (product == null)
    {
        throw new InvalidOperationException("Product not found.");
    }

    // Calculate stock adjustment
    int stockAdjustment = cartItem.Quantity - newQuantity;

    if (product.StockLevel + stockAdjustment < 0)
    {
        throw new InvalidOperationException("Not enough stock available.");
    }

    // Update the stock level and cart item quantity
    product.StockLevel += stockAdjustment;
    cartItem.Quantity = newQuantity;

    _context.CartItems.Update(cartItem);
    await _context.SaveChangesAsync();
}

public async Task RemoveCartItemAsync(int productId, int? userId)
{
    var cartItem = await _context.CartItems
        .FirstOrDefaultAsync(ci => ci.ProductId == productId && 
            (ci.UserId == userId || (ci.UserId == null && userId == null)));

    if (cartItem == null)
    {
        throw new InvalidOperationException("Cart item not found.");
    }

    var product = await _context.Produkter.FindAsync(productId);

    if (product != null)
    {
        product.StockLevel += cartItem.Quantity;  // Restore stock level
    }

    _context.CartItems.Remove(cartItem);
    await _context.SaveChangesAsync();
}

public async Task<List<CartItemDto>> GetCartItemsByUserIdAsync(int userId)
{
    return await _context.CartItems
        .Where(ci => ci.UserId == userId)
        .Include(ci => ci.Produkter)
        .Select(ci => new CartItemDto
        {
            ProductId = ci.ProductId,
            UserId = ci.UserId,
            Quantity = ci.Quantity,
            ProductName = ci.Produkter.ProductName,
            Price = (decimal)ci.Produkter.Price,
            
        })
        .ToListAsync();
}


}
