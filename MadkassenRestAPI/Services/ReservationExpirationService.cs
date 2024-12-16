using MadkassenRestAPI.Models;
using MadkassenRestAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace MadkassenRestAPI.Services {


public class ReservationExpirationService : BackgroundService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ReservationExpirationService> _logger;

    public ReservationExpirationService(ApplicationDbContext context, ILogger<ReservationExpirationService> logger)
    {
        _context = context;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.UtcNow;

            // Find all cart items with expired reservation times (older than 30 minutes)
            var expiredCartItems = await _context.CartItems
                .Where(cartItem => cartItem.AddedAt < now.AddMinutes(-30))
                .ToListAsync(stoppingToken);

            foreach (var item in expiredCartItems)
            {
                // Return the reserved stock to the product
                var product = await _context.Produkter.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.StockLevel += item.Quantity;
                    _context.CartItems.Remove(item); // Remove expired cart item
                }
            }

            await _context.SaveChangesAsync(stoppingToken);
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Wait 1 minute before checking again
        }
    }
}
}