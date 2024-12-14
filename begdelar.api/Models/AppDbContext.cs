using Microsoft.EntityFrameworkCore;

namespace begdelar.api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<UPricefileManual> UPricefileManuals { get; set; }
    }
}
