namespace ClassLibrary.Model
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public decimal TotalAmount { get; set; }

        // Navigation property for the related user
        public Users Users { get; set; }  // Add the navigation property to Users

        // Navigation property for the related OrderItems
        public ICollection<OrderItem> OrderItems { get; set; }  // Add the navigation property for OrderItems
    }
}
