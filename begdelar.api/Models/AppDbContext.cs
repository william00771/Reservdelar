using Microsoft.EntityFrameworkCore;

namespace begdelar.api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UPricefileManual>()
                .ToTable("UPricefileMANUAL", "dbo")
                .HasNoKey();
        }
        public DbSet<UPricefileManual> UPricefileManuals { get; set; }
    }
}
