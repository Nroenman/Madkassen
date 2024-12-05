namespace MadkassenRestAPI.Models
{
    public class User
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;  // Added Email property
        public string PasswordHash { get; set; } = string.Empty;
    }

    // The AuthInput class remains unchanged as it correctly defines Email and Password
    public class AuthInput
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}