using CourseService.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient("ExchangeRate");
builder.Services.AddHttpClient("CurrencyFreaks");
builder.Services.AddHttpClient("OpenExchangeRate");
builder.Services.AddTransient<IApiService,ExchangeRateApiService>();
builder.Services.AddTransient<IApiService,CurrencyFreaksService>();
builder.Services.AddTransient<IApiService,OpenExchangeRateService>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()  
              .AllowAnyMethod()  
              .AllowAnyHeader();  
    });
});

var app = builder.Build();


app.MapControllers();
app.UseCors("AllowAll");

app.Run();
