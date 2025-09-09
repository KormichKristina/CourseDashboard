using CourseService.Models;
using System.Text.Json;

namespace CourseService.Services
{
    public class ExchangeRateApiService:IApiService
    {
        public string Key { get; }
        public HttpClient MyClient { get; }
        public ExchangeRate? MyData { get; set; }
        public ExchangeRateApiService(IConfiguration config,IHttpClientFactory factory)
        {
            Key=config["EXCHANGE_RATE"];
            MyClient = factory.CreateClient("ExchangeRate");
        }

        public async Task<decimal> GetConversionResultAsync(string baseCode,string targetCode,decimal amount)
        {
            var response = await MyClient.GetAsync($"https://v6.exchangerate-api.com/v6/{Key}/pair/{baseCode}/{targetCode}/{amount}");
            var content = await response.Content.ReadAsStringAsync();
            var root = JsonDocument.Parse(content).RootElement;

            if(!root.TryGetProperty("conversion_result", out var prop))
            {
                throw new Exception();
            }
            
            return prop.Deserialize<decimal>();
            
                
        }

    }
}
