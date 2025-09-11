using AuthService.Data;
using AuthService.Extensions;
using AuthService.Models;
using AuthService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
string conStr = builder.Configuration["DB_CONNECTION_STRING"]!;
builder.Services.AddDbContext<MyContext>(options=>options.UseNpgsql(conStr));
builder.Services.AddControllers();
builder.Services.AddTransient<AuthSettings>();
builder.Services.AddAuth(new AuthSettings(builder.Configuration));
builder.Services.AddTransient<JwtService>();
builder.Services.AddTransient<IUserService,UserService>();
builder.Services.AddTransient<IRefreshTokenService,RefreshTokenService>();
builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowAllForReact", (policy) =>
    {
        policy.WithOrigins("http://localhost:5173", "http://frontend:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithExposedHeaders("Set-Cookie");

    });
});
var app = builder.Build();
app.UseCors("AllowAllForReact");
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
