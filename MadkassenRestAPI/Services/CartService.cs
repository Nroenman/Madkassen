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

    // Add an item to the cart and update the stock level
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

    // Update the quantity of an item in the cart and update the stock level
    public async Task UpdateCartItemAsync(int productId, int? userId, int quantity)
    {
        var existingCartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductId == productId && ci.UserId == userId);

        if (existingCartItem == null)
        {
            throw new InvalidOperationException("Item not found in cart.");
        }

        var product = await _context.Produkter.FindAsync(productId);
        if (product == null)
        {
            throw new InvalidOperationException("Product not found.");
        }

        // Ensure there's enough stock to update the quantity
        if (product.StockLevel < quantity)
        {
            throw new InvalidOperationException("Not enough stock available.");
        }

        // Update the quantity
        existingCartItem.Quantity = quantity;

        // Decrease the stock level of the product by the new quantity
        product.StockLevel -= quantity;

        _context.CartItems.Update(existingCartItem);
        await _context.SaveChangesAsync();
    }

    // Remove an item from the cart and restore the stock level
    public async Task RemoveFromCartAsync(int productId, int? userId)
    {
        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductId == productId && ci.UserId == userId);

        if (cartItem == null)
        {
            throw new InvalidOperationException("Item not found in cart.");
        }

        var product = await _context.Produkter.FindAsync(productId);
        if (product == null)
        {
            throw new InvalidOperationException("Product not found.");
        }

        // Restore the stock level of the product after removing it from the cart
        product.StockLevel += cartItem.Quantity;

        // Remove the item from the cart
        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();
    }
}
