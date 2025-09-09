using AuthService.Models;

namespace AuthService.Services
{
    public interface IUserService
    {
        Task AddUserAsync(User user);
        User GetUser(Func<User, bool> func);
        bool IsUserExists(string name);
        Task AddCurrencyAsync(string curr, User user);
        Task RemoveCurrencyAsync(string curr, User user);
    }
}
