using AuthService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Data
{
    public class MyContext:DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<RefreshToken> RefreshTokens { get; set;} = null!;
        public MyContext(DbContextOptions<MyContext> options):base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefreshToken>().HasOne(r => r.User).WithOne(u => u.RefreshToken).HasForeignKey<RefreshToken>(r => r.UserId);
        }
    }
}
