using Microsoft.AspNetCore.Mvc;
using MadkassenRestAPI.Data;
using MadkassenRestAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace MadkassenRestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public UsersController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await context.Users
                .Select(u => new User
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    Email = u.Email,
                    PasswordHash = u.PasswordHash,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    Roles = u.Roles
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await context.Users
                .Where(u => u.UserId == id)
                .Select(u => new User
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    Email = u.Email,
                    PasswordHash = u.PasswordHash,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    Roles = u.Roles
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            if (string.IsNullOrEmpty(user.UserName))
            {
                return BadRequest("UserName is required.");
            }

            if (string.IsNullOrEmpty(user.Email))
            {
                return BadRequest("Email is required.");
            }

            if (string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest("Password is required.");
            }

            var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already in use.");
            }

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            if (string.IsNullOrEmpty(user.UserName))
            {
                user.UserName = user.Email;
            }

            user.PasswordHash = HashPassword(user.PasswordHash);

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        // PUT: api/Users/Update
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateUser([FromBody] User updateData)
        {
            try
            {
                // Get the authenticated user from JWT
                var userFromJwt = (User)HttpContext.Items["User"];

                if (userFromJwt == null)
                {
                    return Unauthorized();
                }

                // Find the user in the database
                var user = await context.Users.FindAsync(userFromJwt.UserId);

                if (user == null)
                {
                    return NotFound();
                }

                // Update the user's information directly
                if (!string.IsNullOrEmpty(updateData.UserName))
                    user.UserName = updateData.UserName;

                if (!string.IsNullOrEmpty(updateData.Email))
                    user.Email = updateData.Email;

                if (!string.IsNullOrEmpty(updateData.PasswordHash))
                    user.PasswordHash = HashPassword(updateData.PasswordHash); // Password must be hashed before saving

                // Mark the time of update
                user.UpdatedAt = DateTime.UtcNow;

                // Save the changes to the database
                await context.SaveChangesAsync();

                return Ok(new { message = "User profile updated successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception and return a friendly error message
                return BadRequest(new { message = "An error occurred while updating the user.", details = ex.Message });
            }
        }

        private string HashPassword(string password)
        {
            using
                (var
                 sha256 = SHA256
                     .Create()) // For illustration, SHA256 is used here. You should use a more secure method like bcrypt in production.
            {
                var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashBytes);
            }
        }
    }
}