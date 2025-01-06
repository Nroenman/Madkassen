namespace ClassLibrary.Model
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        // Navigation property for the related Order
        public Order Order { get; set; }  // Add the navigation property to Order

        // Navigation property for the related Product (Produkter)
        public Produkter Produkter { get; set; }  // Add the navigation property to Produkter
    }
}
