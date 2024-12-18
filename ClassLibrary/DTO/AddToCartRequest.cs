namespace ClassLibrary
{
    public class AddToCartRequest
    {
        public int ProductId { get; set; }
        public int? UserId { get; set; }
        public int Quantity { get; set; }
    }
}
