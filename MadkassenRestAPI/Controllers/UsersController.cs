using MadkassenRestAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using ClassLibrary.Model;
using ClassLibrary;

namespace MadkassenRestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IConfiguration configuration;

        public UsersController(ApplicationDbContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetAllUsers()
        {
            var users = await context.Users
                .Select(u => new Users
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    Roles = u.Roles
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUserById(int id)
        {
            var user = await context.Users
                .Where(u => u.UserId == id)
                .Select(u => new Users
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    Email = u.Email,
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
        public async Task<ActionResult<Users>> CreateUser(Users user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Email) ||
                string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest("UserName, Email, and Password are required.");
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

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileRequest updateRequest)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { Message = "No token provided." });
            }

            var userProfile = await GetUserProfileFromToken(token);
            if (userProfile == null)
            {
                return Unauthorized(new { Message = "Invalid or expired token." });
            }

            var user = await context.Users.FindAsync(int.Parse(userProfile.UserId));
            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            if (!string.IsNullOrEmpty(updateRequest.UserName) && updateRequest.UserName != user.UserName)
            {
                user.UserName = updateRequest.UserName;
            }

            if (!string.IsNullOrEmpty(updateRequest.Email) && updateRequest.Email != user.Email &&
                updateRequest.Email != "string")
            {
                var existingUserWithEmail =
                    await context.Users.FirstOrDefaultAsync(u => u.Email == updateRequest.Email);
                if (existingUserWithEmail != null)
                {
                    return BadRequest(new { Message = "Email is already in use." });
                }

                user.Email = updateRequest.Email;
            }

            if (!string.IsNullOrEmpty(updateRequest.OldPassword) && updateRequest.OldPassword != "string")
            {
                if (!VerifyPassword(updateRequest.OldPassword, user.PasswordHash))
                {
                    return BadRequest(new { Message = "Incorrect old password." });
                }
            }

            if (!string.IsNullOrEmpty(updateRequest.NewPassword))
            {
                user.PasswordHash = HashPassword(updateRequest.NewPassword);
            }

            user.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return Ok(new { Message = "Profile updated successfully." });
        }


        // GET: api/Users/profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { Message = "No token provided." });
            }

            try
            {
                var userProfile = await GetUserProfileFromToken(token);
                if (userProfile == null)
                {
                    return Unauthorized(new { Message = "Invalid or expired token." });
                }

                var user = await context.Users
                    .Where(u => u.UserId.ToString() == userProfile.UserId)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound(new { Message = "User not found." });
                }

                var userDetails = new
                {
                    user.UserId,
                    user.UserName,
                    user.Email,
                    user.CreatedAt,
                    user.UpdatedAt,
                    user.Roles
                };

                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error retrieving user profile", Details = ex.Message });
            }
        }

        private async Task<UserProfile> GetUserProfileFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                var userId = jwtToken?.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

                if (userId == null)
                {
                    return null;
                }

                return new UserProfile
                {
                    UserId = userId
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}