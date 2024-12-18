using ClassLibrary;

namespace MadkassenRestAPI.Models
{
    public class User : Users
    {
      
    }

    public class AuthInput
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}