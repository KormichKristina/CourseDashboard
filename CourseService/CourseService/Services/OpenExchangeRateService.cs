using CourseService.Models;
using System.Text.Json;

namespace CourseService.Services
{
    public class OpenExchangeRateService:IApiService
    {
        public string Key { get; }
        public HttpClient MyClient { get; set; }
        public ExchangeRate? MyData { get; set; }
        public OpenExchangeRateService(IConfiguration config, IHttpClientFactory factory)
        {
            Key = config["OPEN_EXCHANGE_RATE"];
            MyClient = factory.CreateClient("OpenExchangeRate");
        }
        public async Task<ExchangeRate> GetHistoricalDataAsync(TimeSpan period,string baseCode)
        {
            var date = DateTime.UtcNow - period;
            string dateString = date.ToString("yyyy-MM-dd");
            string uri = $"https://openexchangerates.org/api/historical/{dateString}.json?app_id={Key}&base={baseCode}";
            var response = await MyClient.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();

            var historicalData = JsonSerializer.Deserialize<ExchangeRate>(content);
            return historicalData;

        }
        public async Task<ExchangeRate> GetLatestRatesAsync(string baseCode = "USD")
        {


            var response = await MyClient.GetAsync($"https://openexchangerates.org/api/latest.json?app_id={Key}&base={baseCode}");
            var content = await response.Content.ReadAsStringAsync();

            var latest = JsonSerializer.Deserialize<ExchangeRate>(content);
            MyData = latest;
            return latest;
        }
    }
}
