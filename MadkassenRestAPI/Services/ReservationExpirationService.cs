using MadkassenRestAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MadkassenRestAPI.Services
{
    public class ReservationExpirationService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ReservationExpirationService> _logger;

        public ReservationExpirationService(IServiceProvider serviceProvider, ILogger<ReservationExpirationService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("ReservationExpirationService started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Checking for expired cart items...");
                    await PerformExpirationLogic(stoppingToken);

                    // Tjekker én gang i minuttet for udløbede reservationer
                    await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
                }
                catch (TaskCanceledException)
                {
                    _logger.LogInformation("ReservationExpirationService task was canceled.");
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred in the ReservationExpirationService.");
                }
            }

            _logger.LogInformation("ReservationExpirationService stopped.");
        }

        private async Task PerformExpirationLogic(CancellationToken stoppingToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var now = DateTime.UtcNow;

                using (var transaction = await context.Database.BeginTransactionAsync(stoppingToken))
                {
                    try
                    {
                        // Find expired cart items
                        var expiredCartItems = await context.CartItems
                            .Where(cartItem => cartItem.ExpirationTime <= now)
                            .ToListAsync(stoppingToken);

                        if (expiredCartItems.Any())
                        {
                            _logger.LogInformation($"Found {expiredCartItems.Count} expired cart items.");

                            foreach (var item in expiredCartItems)
                            {
                                // Update stock levels for the product
                                var product = await context.Produkter.FindAsync(item.ProductId);
                                if (product != null)
                                {
                                    product.StockLevel += item.Quantity;
                                    _logger.LogInformation($"Updated stock for ProductId {product.ProductId}. Quantity returned: {item.Quantity}");
                                }

                                // Remove expired cart item
                                context.CartItems.Remove(item);
                                _logger.LogInformation($"Removed expired cart item with Id {item.ProductId}.");
                            }

                            // Save changes to the database
                            await context.SaveChangesAsync(stoppingToken);

                            // Commit the transaction
                            await transaction.CommitAsync(stoppingToken);
                            _logger.LogInformation("Transaction committed. Expired cart items processed and removed.");
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error during reservation expiration logic.");

                        // Rollback the transaction in case of an error
                        await transaction.RollbackAsync(stoppingToken);
                        _logger.LogInformation("Transaction rolled back due to an error.");
                    }
                }
            }
        }
    }
}
