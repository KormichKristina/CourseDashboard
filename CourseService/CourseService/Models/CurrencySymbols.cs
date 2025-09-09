using System.Text.Json.Serialization;

namespace CourseService.Models
{
    public record CurrencySymbols
    {
        [JsonPropertyName("currencySymbols")]
        public Dictionary<string,string> Symbols { get; init; }
    }
}
