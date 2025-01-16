using Microsoft.EntityFrameworkCore;
using ClassLibrary.Model;
using MadkassenRestAPI.Data;

namespace MadkassenRestAPI.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Produkter>> GetAllProductsAsync()
        {
            return await _context.Produkter
                .Select(product => new Produkter
                {
                    ProductId = product.ProductId,
                    ProductName = product.ProductName,
                    Description = product.Description,
                    CategoryId = product.CategoryId,
                    Allergies = product.Allergies,
                    AllergyType = product.AllergyType,
                    Price = product.Price,
                    StockLevel = product.StockLevel,
                    ImageUrl = product.ComputedImageUrl
                })
                .ToListAsync();
        }

        public async Task<Produkter> GetProductByIdAsync(int id)
        {
            return await _context.Produkter.FindAsync(id);
        }

        public async Task<Produkter> AddProductAsync(Produkter product)
        {

            _context.Produkter.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Produkter> UpdateProductStockAsync(int id, int quantity)
        {
            var product = await _context.Produkter.FindAsync(id);
            if (product == null)
            {
                return null; // Return null if the product doesn't exist
            }

            // If the quantity is negative, check if enough stock is available
            if (quantity < 0 && product.StockLevel < Math.Abs(quantity))
            {
                return null; // Not enough stock available to decrease
            }

            // Update stock level
            product.StockLevel += quantity;

            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<Produkter>> GetProductsByCategoryAsync(int categoryId)
        {
            return await _context.Produkter
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Price)
                .ToListAsync();
        }
    }
}
