using AuthService.Data;
using AuthService.Models;

namespace AuthService.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        MyContext context;
        public RefreshTokenService(MyContext context) 
        {
            this.context = context;
        }
        public async Task AddTokenAsync(RefreshToken token)
        {
            await context.RefreshTokens.AddAsync(token);
            await context.SaveChangesAsync();
        }

        public async Task DeleteTokenAsync(RefreshToken token)
        {
            context.RefreshTokens.Remove(token);
            await context.SaveChangesAsync();
        }

        public async Task UpdateToken(RefreshToken token)
        {
            token.Expires = DateTime.UtcNow.AddDays(14);
            context.Update(token);
            await context.SaveChangesAsync();
        }
    }
}
