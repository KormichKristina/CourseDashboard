using System.Text.Json.Serialization;

namespace CourseService.Models
{
    public record ConversionRate
    {
        public string BaseCode { get; set; }
        public string TargetCode { get; set; }
        public decimal Amount { get; set; }

    }
}
