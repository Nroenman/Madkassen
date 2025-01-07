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
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

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

modelBuilder.Entity<Order>()
    .HasKey(o => o.OrderId);  // Define the primary key for Orders

modelBuilder.Entity<Order>()
    .Property(o => o.OrderId)
    .HasColumnName("OrderId")
    .ValueGeneratedOnAdd();  // Automatically generate the OrderId

modelBuilder.Entity<Order>()
    .Property(o => o.UserId)
    .HasColumnName("UserId")
    .IsRequired();  // UserId is required for linking to Users

modelBuilder.Entity<Order>()
    .Property(o => o.OrderDate)
    .HasColumnName("OrderDate")
    .HasColumnType("datetime2")
    .HasDefaultValueSql("GETDATE()")  // Default value for OrderDate
    .IsRequired();  // OrderDate is required

modelBuilder.Entity<Order>()
    .Property(o => o.OrderStatus)
    .HasColumnName("OrderStatus")
    .HasMaxLength(50)
    .HasDefaultValue("Pending")  // Default value for OrderStatus
    .IsRequired();  // OrderStatus is required

modelBuilder.Entity<Order>()
    .Property(o => o.TotalAmount)
    .HasColumnName("TotalAmount")
    .HasColumnType("decimal(18,2)")
    .IsRequired();  // TotalAmount is required

// Define the relationship between Orders and OrderItems (1-to-many)
modelBuilder.Entity<Order>()
    .HasMany(o => o.OrderItems)  // One Order can have many OrderItems
    .WithOne(oi => oi.Order)  // Each OrderItem is associated with one Order
    .HasForeignKey(oi => oi.OrderId);  // Foreign key to Order


modelBuilder.Entity<OrderItem>()
    .HasKey(oi => oi.OrderItemId);  // Define the primary key for OrderItem

modelBuilder.Entity<OrderItem>()
    .Property(oi => oi.OrderItemId)
    .HasColumnName("OrderItemId")
    .ValueGeneratedOnAdd();  // Automatically generate the OrderItemId

modelBuilder.Entity<OrderItem>()
    .Property(oi => oi.OrderId)
    .HasColumnName("OrderId")
    .IsRequired();  // OrderId is required

modelBuilder.Entity<OrderItem>()
    .Property(oi => oi.ProductId)
    .HasColumnName("ProductId")
    .IsRequired();  // ProductId is required

modelBuilder.Entity<OrderItem>()
    .Property(oi => oi.Quantity)
    .HasColumnName("Quantity")
    .IsRequired();  // Quantity is required

modelBuilder.Entity<OrderItem>()
    .Property(oi => oi.Price)
    .HasColumnName("Price")
    .HasColumnType("decimal(18,2)")
    .IsRequired();  // Price is required

modelBuilder.Entity<OrderItem>()
    .HasOne(oi => oi.Produkter)  
    .WithMany()  // A Product can be associated with many OrderItems
    .HasForeignKey(oi => oi.ProductId);  // Foreign key is ProductId

modelBuilder.Entity<Order>()
    .HasOne(o => o.Users)  // Each Order is linked to one User
    .WithMany()  // A User can have many Orders
    .HasForeignKey(o => o.UserId);  // Foreign key is UserId

    }
    }
}
