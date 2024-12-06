using MadkassenRestAPI.Models;
using MadkassenRestAPI.Data; // Import your DbContext namespace
using System.Linq;

namespace MadkassenRestAPI.Repositories
{
    public class UserRepository(ApplicationDbContext context) : IUserRepository
    {
       
        public User? GetByEmail(string email)
        {
            var dbUser = context.Users.FirstOrDefault(u => u.Email == email);
            if (dbUser == null) return null;

            return new User
            {
                Username = dbUser.UserName,
                Email = dbUser.Email,
                PasswordHash = dbUser.PasswordHash,
                UserName = dbUser.UserName,
                Roles = dbUser.Roles,
            };
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}