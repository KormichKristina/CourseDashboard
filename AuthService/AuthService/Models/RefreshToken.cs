using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Models
{
    public class RefreshToken
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime Expires { get; set; }
    }
}
