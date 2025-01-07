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
        // Step 1: Get cart items for the user
        var cartItems = await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .Include(ci => ci.Produkter)
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
            Price = ci.Produkter.Price
        }).ToList();

        _context.OrderItems.AddRange(orderItems);
        await _context.SaveChangesAsync();

        // Step 6: Remove items from the cart after the order is placed
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        // Return the newly created OrderId
        return orderId;
    }
}