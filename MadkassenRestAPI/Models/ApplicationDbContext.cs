using Microsoft.EntityFrameworkCore;
using ClassLibrary;

namespace MadkassenRestAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produkter> Produkter { get; set; }
        public DbSet<Kategori> Kategori { get; set; }

       protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Kategori entity configuration
        modelBuilder.Entity<Kategori>()
            .HasKey(k => k.CategoryId);

        modelBuilder.Entity<Kategori>()
            .Property(k => k.CategoryName)
            .HasColumnName("CategoryName")
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<Kategori>()
            .Property(k => k.Description)
            .HasColumnName("Description");

        // Produkter entity configuration
        modelBuilder.Entity<Produkter>()
            .HasKey(p => p.ProductId);  // Explicitly define the primary key for Produkter

        modelBuilder.Entity<Produkter>()
            .Property(p => p.ProductName)
            .HasColumnName("ProductName")
            .HasMaxLength(200)
            .IsRequired();

        modelBuilder.Entity<Produkter>()
            .Property(p => p.Description)
            .HasColumnName("Description");

             modelBuilder.Entity<Produkter>()
        .Property(p => p.AllergyType)
        .HasConversion(
            v => v.HasValue ? v.Value.ToString() : null,  // Convert to string when saving
            v => string.IsNullOrEmpty(v) ? (AllergyType?)null : Enum.Parse<AllergyType>(v)  // Convert string back to enum when retrieving
        );

        modelBuilder.Entity<Produkter>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Produkter>()
            .Property(p => p.StockLevel)
            .HasColumnName("StockLevel");
    }
    }
}
