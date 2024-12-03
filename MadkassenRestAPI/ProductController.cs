using Microsoft.AspNetCore.Mvc;
using ClassLibrary;

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // In-memory list of products for now, this could be replaced by a database later
        private static List<Produkter> products = new List<Produkter>
        {
            new Produkter(1, "Mælk", "En dejlig liter komælk", 1, true, AllergyType.Dairy, 1.99, 100),
            new Produkter(2, "Banan", "Kan du tage den i én mundfuld?", 1, false, null, 0.99, 200)
        };

        // Get all products
        [HttpGet]
        public ActionResult<IEnumerable<Produkter>> GetAllProducts()
        {
            return Ok(products); // Return list of products as JSON
        }

        // Get a product by id
        [HttpGet("{id}")]
        public ActionResult<Produkter> GetProduct(int id)
        {
            var product = products.FirstOrDefault(p => p.ProductId == id);
            if (product == null)
            {
                return NotFound(); // Return 404 if product not found
            }
            return Ok(product); // Return 200 with the product if found
        }

        // Add a new product
        [HttpPost]
        public ActionResult<Produkter> AddProduct(Produkter product)
        {
            // Add product to the list
            products.Add(product);

            // Return 201 (Created) with the product and a location header
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }
    }
}
