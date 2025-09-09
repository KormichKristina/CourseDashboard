using AuthService.Models;
using AuthService.Services;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("api"),ApiController]
    public class UserController:ControllerBase
    {
        IUserService userService;
        JwtService jwtService;
        IRefreshTokenService refreshService;
        public UserController(IUserService userService,JwtService jwtService,IRefreshTokenService refreshService)
        {
            this.userService=userService;
            this.jwtService = jwtService;
            this.refreshService = refreshService;
        }

        [HttpPost("register")]
        public async Task<IResult> Register([FromBody] UserRequest request)
        {
            if (userService.IsUserExists(request.Name)||string.IsNullOrEmpty(request.Name))
            {
                return Results.Conflict("user with the same name already exists");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var user = new User { Name = request.Name, PasswordHash = passwordHash };

            await userService.AddUserAsync(user);

            var token=jwtService.GenerateToken(user);
            var refreshToken = new RefreshToken
            {
                Token = jwtService.GenerateRefreshToken(),
                Expires = DateTime.UtcNow.AddDays(14),
                User = user

            };
            await refreshService.AddTokenAsync(refreshToken);

            //Response.Cookies.Append("auth", token);
            Response.Cookies.Append("ref", refreshToken.Token,new CookieOptions { HttpOnly=true,Secure=true,SameSite=SameSiteMode.None,Domain= "localhost", Expires=refreshToken.Expires});

            return Results.Ok(new {RefreshToken=refreshToken.Token,AccessToken=token});
        }

        [HttpPost("login")]
        public async Task<IResult> Login([FromBody] UserRequest request)
        {
            var user = userService.GetUser(u=>u.Name==request.Name&&BCrypt.Net.BCrypt.Verify(request.Password,u.PasswordHash));
            if(user == null)
            {
                return Results.Conflict("this user is not exist");
            }

            var refresh = user.RefreshToken;

            if (refresh.Expires < DateTime.UtcNow)
            {
                await refreshService.DeleteTokenAsync(refresh);
                refresh = new RefreshToken
                {
                    Token = jwtService.GenerateRefreshToken(),
                    Expires = DateTime.UtcNow.AddDays(14),
                    User = user
                };
                await refreshService.AddTokenAsync(refresh);
            }

            var token = jwtService.GenerateToken(user);
            //Response.Cookies.Append("auth", token);
            Response.Cookies.Append("ref", user.RefreshToken.Token, new CookieOptions() { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None, Expires = refresh.Expires });

            return Results.Ok(new { RefreshToken = user.RefreshToken.Token, AccessToken = token });
        }

        [HttpPost("refresh")]
        public async Task<IResult> RefreshToken()
        {
            string val;

            if (!Request.Cookies.TryGetValue("ref",out val))
            {
                return Results.Conflict();
            }

            var user = userService.GetUser(u => u.RefreshToken.Token == val&&u.RefreshToken.Expires>=DateTime.UtcNow);

            if(user == null)
            {
                return Results.Conflict();
            }

            var token = jwtService.GenerateToken(user);
            //Response.Cookies.Append("auth", token);

            return Results.Ok(token);
        }

        [HttpPost("logout"),Authorize]
        public async Task<IResult> Logout()
        {
            string val;

            if (!Request.Cookies.TryGetValue("ref", out val))
            {
                return Results.Conflict();
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.Now.AddDays(-15)
            };

            Response.Cookies.Append("ref", "", cookieOptions);

            return Results.Ok();
        }

        [HttpGet("me"),Authorize]
        public async Task<IResult> GetMyself()
        {

            string name = User.FindFirst("Name").Value;
            var user = userService.GetUser(u => u.Name == name);
            if (user == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(new {Name=user.Name,Currencies=user.FavoriteCurrencies});
        }

        [HttpPost("currency"),Authorize]
        public async Task<IResult> AddCurrency([FromBody] CurrencyRequest request)
        {
            string userName= User.FindFirst("Name").Value;
            var user = userService.GetUser(u => u.Name == userName);

            if (user == null)
            {
                return Results.Conflict();
            }

            await userService.AddCurrencyAsync(request.CurrencyName, user);

            return Results.Ok();
        }
        [HttpDelete("currency"), Authorize]
        public async Task<IResult> RemoveCurrency([FromBody] CurrencyRequest request)
        {
            string userName = User.FindFirst("Name").Value;
            var user = userService.GetUser(u => u.Name == userName);

            if (user == null)
            {
                return Results.Conflict();
            }

            await userService.RemoveCurrencyAsync(request.CurrencyName, user);

            return Results.Ok();
        }

    }
}
