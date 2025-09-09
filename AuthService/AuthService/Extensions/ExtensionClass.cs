using AuthService.Models;


namespace AuthService.Extensions
{
    public static class ExtensionClass
    {
        public static void AddAuth(this IServiceCollection collection,AuthSettings settings)
        {
            collection.AddAuthentication("Bearer").AddJwtBearer(options =>
            {

                

                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidAudience = settings.Audience,
                    ValidateIssuer = true,
                    ValidIssuer = settings.Issuer,
                    ValidateLifetime = true,
                    IssuerSigningKey = settings.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true

                };

                options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
                {
                    OnMessageReceived = (context) =>
                    {
                        context.Token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                        return Task.CompletedTask;
                    }
                };
                
            });
            collection.AddAuthorization();
        }
    }
}
