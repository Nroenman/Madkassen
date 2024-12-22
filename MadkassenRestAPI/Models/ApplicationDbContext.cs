using Microsoft.EntityFrameworkCore;
using ClassLibrary;
using ClassLibrary.Model;

namespace MadkassenRestAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produkter> Produkter { get; set; }
        public DbSet<Kategori> Kategori { get; set; }
        public DbSet<Users> Users {get; set;}
        public DbSet<CartItem> CartItems { get; set; }

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


        modelBuilder.Entity<Users>()
            .HasKey(u => u.UserId);
            
        modelBuilder.Entity<Users>()
            .Property(u => u.UserName)
            .HasColumnName("UserName")
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<Users>()
            .Property(u => u.Email)
            .HasColumnName("Email")
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<Users>()
            .Property(u => u.PasswordHash)
            .HasColumnName("PasswordHash")
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<Users>()
            .Property(u => u.CreatedAt)
            .HasColumnName("CreatedAt")
            .HasColumnType("datetime2") // SQL Server type
            .IsRequired(true); // Ensure this field is always set

        modelBuilder.Entity<Users>()
            .Property(u => u.UpdatedAt)
            .HasColumnName("UpdatedAt")
            .HasColumnType("datetime2") // SQL Server type
            .IsRequired(true); // Allow null values

        modelBuilder.Entity<Users>()
            .Property(u => u.Roles)
            .HasColumnName("Roles")
            .HasMaxLength(50)
            .IsRequired();

            modelBuilder.Entity<CartItem>()
    .HasKey(c => c.CartItemId);  // Define the primary key for CartItem

modelBuilder.Entity<CartItem>()
    .Property(c => c.CartItemId)
    .HasColumnName("CartItemId");

modelBuilder.Entity<CartItem>()
    .Property(c => c.ProductId)
    .HasColumnName("ProductId")
    .IsRequired();  // Assuming ProductId is required

modelBuilder.Entity<CartItem>()
    .Property(c => c.UserId)
    .HasColumnName("UserId")
    .IsRequired();  // Assuming UserId is required

modelBuilder.Entity<CartItem>()
    .Property(c => c.Quantity)
    .HasColumnName("Quantity")
    .IsRequired();  // Assuming Quantity is required

modelBuilder.Entity<CartItem>()
    .HasOne(c => c.Produkter)  // Link CartItem to Produkter (foreign key relationship)
    .WithMany()  // A Product can be linked to many CartItems
    .HasForeignKey(c => c.ProductId);  // Foreign key is ProductId

modelBuilder.Entity<CartItem>()
    .HasOne(c => c.Users)  // Link CartItem to Users (foreign key relationship)
    .WithMany()  // A User can have many CartItems
    .HasForeignKey(c => c.UserId);  // Foreign key is UserId
    }
    }
}
