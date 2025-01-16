using Microsoft.AspNetCore.Mvc;
using ClassLibrary.Model;
using MadkassenRestAPI.Services;

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produkter>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produkter>> GetProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(product.ImageUrl))
            {
                product.ImageUrl = "https://i.imghippo.com/files/KCsO2582jBE.png";
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Produkter>> AddProduct(Produkter product)
        {
            var newProduct = await _productService.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.ProductId }, newProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductStock(int id, [FromBody] UpdateStockRequest request)
        {
            var updatedProduct = await _productService.UpdateProductStockAsync(id, request.Quantity);

            if (updatedProduct == null)
            {
                return BadRequest("Not enough stock available");
            }

            return Ok(updatedProduct);
        }


        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryId)
        {
            if (categoryId <= 0)
            {
                return BadRequest(new { message = "Invalid category ID" });
            }

            var products = await _productService.GetProductsByCategoryAsync(categoryId);
            if (products == null || products.Count == 0)
            {
                return NotFound(new { message = "No products found in this category" });
            }

            return Ok(products);
        }
    }
}
