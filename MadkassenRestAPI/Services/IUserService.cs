using MadkassenRestAPI.Models;

namespace MadkassenRestAPI.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
    }
}