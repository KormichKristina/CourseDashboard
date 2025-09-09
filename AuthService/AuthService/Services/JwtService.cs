using AuthService.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace AuthService.Services
{
    public class JwtService
    {
        AuthSettings settings;
        public JwtService(AuthSettings settings)
        {
            this.settings = settings;
        }
        public string GenerateToken(User user)
        {

            var claims = new List<Claim>
            {
                new Claim("Id",user.Id.ToString()),
                new Claim("Name",user.Name)
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: settings.Issuer,
                audience: settings.Audience,
                expires: DateTime.UtcNow.Add(settings.Expires),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials( settings.GetSymmetricSecurityKey(),SecurityAlgorithms.HmacSha256),
                claims:claims
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string GenerateRefreshToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        }
    }
}
