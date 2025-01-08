using ClassLibrary.Model;
using MadkassenRestAPI.Data;
using Microsoft.EntityFrameworkCore;

public class OrderService
{
    private readonly ApplicationDbContext _context;

    public OrderService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateOrderAsync(int userId)
    {
        // Step 1: Get cart items for the user, including the ProductName
        var cartItems = await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .Include(ci => ci.Produkter)  // Ensure Product information (including ProductName) is loaded
            .ToListAsync();

        if (cartItems.Count == 0)
        {
            throw new InvalidOperationException("No items found in the cart.");
        }

        // Step 2: Calculate the total amount for the order
        decimal totalAmount = cartItems.Sum(ci => ci.Quantity * ci.Produkter.Price);

        // Step 3: Insert the new order into the Orders table
        var newOrder = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            OrderStatus = "Pending",
            TotalAmount = totalAmount
        };

        _context.Orders.Add(newOrder);
        await _context.SaveChangesAsync();

        // Step 4: Retrieve the newly created OrderId
        var orderId = newOrder.OrderId;

        // Step 5: Insert the order items into the OrderItems table
        var orderItems = cartItems.Select(ci => new OrderItem
        {
            OrderId = orderId,
            ProductId = ci.ProductId,
            Quantity = ci.Quantity,
            Price = ci.Produkter.Price,
            ProductName = ci.Produkter.ProductName  // Ensure ProductName is set correctly
        }).ToList();

        _context.OrderItems.AddRange(orderItems);
        await _context.SaveChangesAsync();

        // Step 6: Remove items from the cart after the order is placed
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        // Return the newly created OrderId
        return orderId;
    }

    public async Task<List<ProductSummary>> GetTopProductsByUserAsync(int userId, int days)
{
    var fromDate = DateTime.UtcNow.AddDays(-days);

    return await _context.OrderItems
        .Where(oi => oi.Order.OrderDate >= fromDate && oi.Order.UserId == userId)
        .GroupBy(oi => new { oi.ProductId, oi.ProductName })
        .Select(group => new ProductSummary
        {
            ProductId = group.Key.ProductId,
            ProductName = group.Key.ProductName,
            TotalQuantity = group.Sum(g => g.Quantity)
        })
        .OrderByDescending(ps => ps.TotalQuantity)
        .Take(10) // 10 mest købte produkter.. kan ændres til det antal vi synes bedst om.
        .ToListAsync();
}

public async Task<List<ProductSummary>> GetTopProductsOverallAsync(int days)
{
    var fromDate = DateTime.UtcNow.AddDays(-days);

    return await _context.OrderItems
        .Where(oi => oi.Order.OrderDate >= fromDate)
        .GroupBy(oi => new { oi.ProductId, oi.ProductName })
        .Select(group => new ProductSummary
        {
            ProductId = group.Key.ProductId,
            ProductName = group.Key.ProductName,
            TotalQuantity = group.Sum(g => g.Quantity)
        })
        .OrderByDescending(ps => ps.TotalQuantity)
        .Take(10) // 10 mest købte produkter.. kan ændres til det antal vi synes bedst om.
        .ToListAsync();
}

}
