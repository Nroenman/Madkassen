using MadkassenRestAPI.Models; // Import the correct User model
using MadkassenRestAPI.Data;    // Import the ApplicationDbContext
using System.IdentityModel.Tokens.Jwt;

namespace MadkassenRestAPI.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public User Authenticate(string email, string password)
        {
            // Find user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null; // Return null if user doesn't exist or password doesn't match
            }

            // Map to the MadkassenRestAPI.Models.User
            return new User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Roles = user.Roles,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }

        public User GetUserFromJwtToken(string token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtHandler.ReadToken(token) as JwtSecurityToken;

            if (jwtToken == null)
                throw new UnauthorizedAccessException("Invalid token");

            var userName = jwtToken?.Claims?.FirstOrDefault(c => c.Type == "sub")?.Value;

            if (string.IsNullOrEmpty(userName))
                throw new UnauthorizedAccessException("Invalid token");

            var user = _context.Users.FirstOrDefault(u => u.UserName == userName);

            if (user == null)
                throw new UnauthorizedAccessException("User not found");

            return new User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Roles = user.Roles,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
