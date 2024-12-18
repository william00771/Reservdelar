using Microsoft.EntityFrameworkCore;

namespace begdelar.api.net2._3.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UPricefileManual>()
                .ToTable("UPricefileMANUAL", "dbo")
                .HasKey(u => new
                {
                    u.Artnr,
                    u.Qtfak1,
                    u.UnitType,
                    u.Replcode
                });
        }

        public DbSet<UPricefileManual> UPricefileManuals { get; set; }
    }
}