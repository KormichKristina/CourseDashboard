using CourseService.Models;
using CourseService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CourseService.Controllers
{
    [ApiController,Route("api")]
    public class CourseController : ControllerBase
    {
        ExchangeRateApiService exchangeRateApiService;
        CurrencyFreaksService currencyFreaksService;
        OpenExchangeRateService openExchangeRateService;
        public CourseController(IEnumerable<IApiService>services)
        {
            exchangeRateApiService = services.OfType<ExchangeRateApiService>().FirstOrDefault();
            currencyFreaksService = services.OfType<CurrencyFreaksService>().FirstOrDefault();
            openExchangeRateService = services.OfType<OpenExchangeRateService>().FirstOrDefault();
        }

        [HttpGet("latest")]
        public async Task<IResult> GetLatestAsync()
        {
            
            string codeBase = "USD";
            
            var latestRates = openExchangeRateService.MyData ?? await openExchangeRateService.GetLatestRatesAsync(codeBase);
            var symbols = currencyFreaksService.MyData ?? await currencyFreaksService.GetSymbolsAsync();
            var historical = await openExchangeRateService.GetHistoricalDataAsync(new TimeSpan(1, 0, 0, 0), "USD");

            var currencies = from c in latestRates.Rates 
                             let name = symbols.Symbols.Where(s=>s.Key==c.Key).Select(s=>s.Value).FirstOrDefault()
                             let diff=c.Value-historical.Rates.Where(h=>h.Key==c.Key).Select(h=>h.Value).FirstOrDefault()
                             select new Currency { CodeBase = codeBase, MyCode = c.Key, Value = c.Value, Name = name,Diff=diff };
           
            return Results.Ok(currencies);
            
        }
        [HttpGet("conversion/{codeBase}/{targetCode}/{amount}")]
        public async Task<IResult> GetConversionRateAsync(string codeBase,string targetCode,string amount)
        {

            try
            {
                var result = await exchangeRateApiService.GetConversionResultAsync(codeBase, targetCode, decimal.Parse(amount));
                return Results.Ok(result);
            }
            catch (Exception)
            {
                return Results.BadRequest();
            }
            
            
        }
        [HttpGet("history/{codeBase}")]
        public async Task<IResult> GetHistoricalDataAsync(string codeBase)
        {
            List<ExchangeRate> rates = new List<ExchangeRate>();

            for(int i = 1; i <= 3; i++)
            {
                var data = await openExchangeRateService.GetHistoricalDataAsync(new TimeSpan(i, 0, 0, 0), codeBase);
                rates.Add(data);
            }

            return Results.Ok(rates);
        }
        [HttpGet("code-names")]
        public async Task<IResult> GetNamesAsync()
        {
            var names = currencyFreaksService.MyData ?? await currencyFreaksService.GetSymbolsAsync();
            return Results.Ok(names);
        }
    }
}
