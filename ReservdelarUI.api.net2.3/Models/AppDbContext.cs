using Microsoft.EntityFrameworkCore;

namespace ReservdelarUI.api.net2._3.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UPricefileManual>()
                .ToTable("UPricefileMANUAL", "dbo")
                .HasKey("Artnr");
        }

        public DbSet<UPricefileManual> UPricefileManuals { get; set; }
    }
}