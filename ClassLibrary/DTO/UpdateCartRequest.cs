namespace ClassLibrary
{

public class UpdateCartRequest
{
    public int ProductId { get; set; }
    public int? UserId { get; set; }
    public int Quantity { get; set; }
}

}
