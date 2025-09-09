using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AuthService.Models
{
    public class AuthSettings
    {
        public string SecretKey { get;}
        public TimeSpan Expires { get;}
        public string Audience { get; }
        public string Issuer { get; }

        IConfiguration config;

        public AuthSettings(IConfiguration config)
        {
            this.config = config;
            SecretKey = config["SECRET_KEY"];
            Expires = TimeSpan.Parse((config["AuthSettings:Expires"]));
            Audience = config["AuthSettings:Audience"];
            Issuer= config["AuthSettings:Issuer"];

        }
        public SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
    }
}
