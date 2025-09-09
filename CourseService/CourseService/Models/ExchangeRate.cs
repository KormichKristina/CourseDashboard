using System.Text.Json.Serialization;

namespace CourseService.Models
{
    public record ExchangeRate
    {
        [JsonPropertyName("rates")]
        public Dictionary<string,decimal> Rates { get; set; }
    }
}
