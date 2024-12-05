using MadkassenRestAPI.Models;

namespace MadkassenRestAPI.Services
{
    public class UserService : IUserService
    {
        // This is a temporary in-memory list of users.
        private static readonly List<User> Users = new List<User>
        {
            new User { Email = "user@example.com", Username = "user", PasswordHash = "hashedpassword" } // Example user
        };

        public User Authenticate(string email, string password)
        {
            // Look for the user with the given email
            var user = Users.SingleOrDefault(u => u.Email == email);
            
            // If no user found, throw an exception
            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }

            // Here, you should compare the hashed password with the stored password hash
            // In this example, we are directly comparing, but you should hash the password and compare.
            if (user.PasswordHash != password)  // This is a simplified check
            {
                throw new ArgumentException("Incorrect password.");
            }

            return user; // Return the user if authentication is successful
        }
    }
}