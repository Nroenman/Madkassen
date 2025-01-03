using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClassLibrary.Model;
using MadkassenRestAPI.Data;

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(ApplicationDbContext context) : ControllerBase
    {
        // Get all products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produkter>>> GetAllProducts()
        {
            var products = await context.Produkter
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

            return Ok(products);
        }

        // Get a product by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Produkter>> GetProduct(int id)
        {
            var product = await context.Produkter.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Apply placeholder only if ImageUrl is null or empty
            if (string.IsNullOrEmpty(product.ImageUrl))
            {
                product.ImageUrl = "https://i.imghippo.com/files/KCsO2582jBE.png"; // Apply placeholder if null or empty
            }

            return Ok(product);
        }

        // Add a new product
        [HttpPost]
        public async Task<ActionResult<Produkter>> AddProduct(Produkter product)
        {
            context.Produkter.Add(product);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductStock(int id, [FromBody] UpdateStockRequest request)
        {
            var product = await context.Produkter.FindAsync(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            // Ensure that the stock is enough to reserve the quantity
            if (product.StockLevel < request.Quantity)
            {
                return BadRequest("Not enough stock available");
            }

            // Deduct stock for reservation
            product.StockLevel -= request.Quantity;

            // Save the updated product
            await context.SaveChangesAsync();

            return Ok(product);
        }
        // Endpoint to get products by category ID
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryId)
        {
            // Check if the categoryId is valid (e.g., greater than 0)
            if (categoryId <= 0)
            {
                return BadRequest(new { message = "Invalid category ID" });
            }

            var productsQuery = context.Produkter
                .Where(p => p.CategoryId == categoryId); // Filter by category

            productsQuery = productsQuery.OrderBy(p => p.Price);

            var products = await productsQuery
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound(new { message = "No products found in this category" });
            }

            // Return the products list with pagination details if necessary
            return Ok(products);
        }
    }
}