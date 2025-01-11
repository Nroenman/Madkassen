namespace ClassLibrary.Model
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; }

        // Navigation property for the related Order
        public Order Order { get; set; }  // Add the navigation property to Order

        public Produkter Produkter { get; set; } 
    }
}
