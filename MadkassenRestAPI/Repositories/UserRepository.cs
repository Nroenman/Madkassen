using MadkassenRestAPI.Models;
using System.Linq;

namespace MadkassenRestAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>(); // Example in-memory data store

        // Method to retrieve user by email (or username)
        public User GetByEmail(string email)
        {
            return _users.FirstOrDefault(u => u.Username == email); // Assuming Username is the email
        }

        public void Add(User user)
        {
            throw new NotImplementedException();
        }
    }
}