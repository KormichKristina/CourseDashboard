using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services
{
    public class UserService : IUserService
    {
        MyContext context;
        public UserService(MyContext context)
        {
            this.context = context;
        }

        public async Task AddCurrencyAsync(string curr, User user)
        {
            user.FavoriteCurrencies.Add(curr);
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
        public User GetUser(Func<User,bool> func)
        {
            var user = context.Users.Include(u=>u.RefreshToken).FirstOrDefault(func);
            return user;
        }
        public bool IsUserExists(string name)
        {
            return context.Users.Where(u=>u.Name==name).FirstOrDefault() != null;
        }

        public async Task RemoveCurrencyAsync(string curr, User user)
        {
            user.FavoriteCurrencies.Remove(curr);
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }
    }
}
