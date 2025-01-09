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
    using var transaction = await _context.Database.BeginTransactionAsync();
    try
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .Include(ci => ci.Produkter)
            .ToListAsync();

        if (cartItems.Count == 0)
        {
            throw new InvalidOperationException("No items found in the cart.");
        }

        decimal totalAmount = cartItems.Sum(ci => ci.Quantity * ci.Produkter.Price);

        var newOrder = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            OrderStatus = "Pending",
            TotalAmount = totalAmount
        };

        _context.Orders.Add(newOrder);
        await _context.SaveChangesAsync();

        var orderId = newOrder.OrderId;

        var orderItems = cartItems.Select(ci => new OrderItem
        {
            OrderId = orderId,
            ProductId = ci.ProductId,
            Quantity = ci.Quantity,
            Price = ci.Produkter.Price,
            ProductName = ci.Produkter.ProductName // Ensure ProductName is set correctly
        }).ToList();

        _context.OrderItems.AddRange(orderItems);
        await _context.SaveChangesAsync();

        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        await transaction.CommitAsync();

        return orderId;
    }
    catch (Exception ex)
    {
        // Rollback the transaction in case of an error
        await transaction.RollbackAsync();
        throw new InvalidOperationException("Failed to complete the order.", ex);
    }
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
