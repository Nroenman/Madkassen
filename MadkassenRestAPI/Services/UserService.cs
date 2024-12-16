using MadkassenRestAPI.Models;
using MadkassenRestAPI.Data;


namespace MadkassenRestAPI.Services
{
    public class UserService(ApplicationDbContext context) : IUserService
    {
        public User Authenticate(string email, string password)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            
            if (user == null)
            {
                return null; 
            }

            if (user.PasswordHash != password)
            {
                return null; 
            }

            return new User
            {
                UserId = user.UserId,
                Username = user.UserName,
                Email = user.Email,
                Roles = user.Roles
            };
        }
    }
}