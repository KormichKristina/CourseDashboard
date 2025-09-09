using AuthService.Models;

namespace AuthService.Services
{
    public interface IRefreshTokenService
    {
        Task AddTokenAsync(RefreshToken token);
        Task UpdateToken(RefreshToken token);
        Task DeleteTokenAsync(RefreshToken token);

    }
}
