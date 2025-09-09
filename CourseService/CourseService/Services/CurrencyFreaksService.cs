using CourseService.Models;
using System.Text.Json;

namespace CourseService.Services
{
    public class CurrencyFreaksService:IApiService
    {
        public string Key { get; }
        public HttpClient MyClient { get; }
        public CurrencySymbols? MyData { get; set; }
        public CurrencyFreaksService(IConfiguration config,IHttpClientFactory factory)
        {
            Key = config["CURRENCY_FREAKS"];
            MyClient = factory.CreateClient("CurrencyFreaks");
        }
        public async Task <CurrencySymbols> GetSymbolsAsync()
        {
            var response = await MyClient.GetAsync("https://api.currencyfreaks.com/v2.0/currency-symbols");
            var content = await response.Content.ReadAsStringAsync();

            var symbols = JsonSerializer.Deserialize<CurrencySymbols>(content);
            MyData = symbols;
            return symbols;
        }
    }
}
