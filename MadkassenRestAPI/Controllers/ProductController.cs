using Microsoft.AspNetCore.Mvc;
using ClassLibrary.Model;
using MadkassenRestAPI.Services;
using System.Security.Claims;
using MadkassenRestAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(ProductService productService, ApplicationDbContext context)
        : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Produkter>> AddProduct(Produkter product)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Invalid or missing user ID in token" });
            }

            if (string.IsNullOrEmpty(product.ImageUrl) || product.ImageUrl == "string")
            {
                product.ImageUrl = null; // Setting ImageUrl to null will trigger the default image in ComputedImageUrl
            }

            context.Produkter.Add(product);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Produkter>> GetProduct(int id)
        {
            // Fetch product by its ID using the product service
            var product = await productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductStock(int id, [FromBody] UpdateStockRequest request)
        {
            var updatedProduct = await productService.UpdateProductStockAsync(id, request.Quantity);

            if (updatedProduct == null)
            {
                return BadRequest("Not enough stock available");
            }

            return Ok(updatedProduct);
        }
    }
}