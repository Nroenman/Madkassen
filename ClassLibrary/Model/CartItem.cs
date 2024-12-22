using ClassLibrary.Model;

namespace ClassLibrary 
{
public class CartItem
{
    public int CartItemId { get; set; }
    public int ProductId { get; set; }  // Foreign key to Produkter
    public int? UserId { get; set; }  // Nullable UserId for guests
    public int Quantity { get; set; }
    public DateTime AddedAt { get; set; }
    public DateTime ExpirationTime { get; set; }

    // Navigation property for the related product
    public Produkter Produkter { get; set; }
    public Users Users { get; set; }
}
}