using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// Ensure this is the correct namespace for ApplicationDbContext
using ClassLibrary;
using MadkassenRestAPI.Models; // If this is where the Kategori class is defined

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Kategori
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kategori>>> GetAllCategories()
        {
            return await _context.Kategori.ToListAsync(); // Get all categories from the database
        }

        // GET: api/Kategori/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kategori>> GetCategory(int id)
        {
            var category = await _context.Kategori.FindAsync(id);

            if (category == null)
            {
                return NotFound(); // Return 404 if category not found
            }

            return category; // Return the category if found
        }

        // POST: api/Kategori
        [HttpPost]
        public async Task<ActionResult<Kategori>> PostCategory(Kategori category)
        {
            _context.Kategori.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, category); // Return 201
        }
    }
}
