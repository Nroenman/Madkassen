using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClassLibrary; // Include the namespace where your Produkter and Kategori classes are defined
using MadkassenRestAPI.Data; // Include the namespace where ApplicationDbContext is located

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Inject ApplicationDbContext into the controller
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produkter>>> GetAllProducts()
        {
            var products = await _context.Produkter.ToListAsync();
            return Ok(products);
        }

        // Get a product by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Produkter>> GetProduct(int id)
        {
            var product = await _context.Produkter.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Add a new product
        [HttpPost]
        public async Task<ActionResult<Produkter>> AddProduct(Produkter product)
        {
            _context.Produkter.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }
    }
}
