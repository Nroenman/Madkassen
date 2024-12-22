using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClassLibrary; // Include the namespace where your Produkter and Kategori classes are defined
using MadkassenRestAPI.Data; // Include the namespace where ApplicationDbContext is located

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
                    Price = product.Price,
                    StockLevel = product.StockLevel,
                    ImageUrl = string.IsNullOrEmpty(product.ImageUrl)
                        ? "https://i.imghippo.com/files/KCsO2582jBE.png"
                        : product.ImageUrl
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
    }
}