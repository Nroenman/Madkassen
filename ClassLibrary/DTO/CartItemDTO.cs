namespace ClassLibrary {

public class CartItemDto
{
    public int ProductId { get; set; }
    public int? UserId { get; set; }
    public int Quantity { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
}
}