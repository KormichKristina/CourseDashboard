using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public List<string> FavoriteCurrencies { get; set; } = new List<string>();
        public RefreshToken? RefreshToken { get; set; }
    }
}
