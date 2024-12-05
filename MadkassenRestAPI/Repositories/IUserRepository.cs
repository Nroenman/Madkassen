using MadkassenRestAPI.Models;

namespace MadkassenRestAPI.Repositories
{
    public interface IUserRepository
    {
        User GetByEmail(string email);
        void Add(User user);
    }
}