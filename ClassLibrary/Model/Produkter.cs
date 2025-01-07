namespace ClassLibrary.Model 
{

public enum AllergyType
{
    Gluten,
    Laktose,
    Nødder,
    Skaldyr,
    Soya,
    Æg
}

public class Produkter
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public bool Allergies { get; set; }
    public AllergyType? AllergyType { get; set; }
    public decimal Price { get; set; }
    public int StockLevel { get; set; }
    public string? ImageUrl { get; set; }
    public string ComputedImageUrl { get; set; }


    // Default constructor
    public Produkter() { }

    // Parameterized constructor for easier object creation
    public Produkter(int productId, string productName, string description, int categoryId, bool allergies, AllergyType? allergyType, decimal price, int stockLevel, string imageUrl)
    {
        ProductId = productId;
        ProductName = productName;
        Description = description;
        CategoryId = categoryId;
        Allergies = allergies;
         AllergyType = allergies ? allergyType : null; // Set to null if Allergies is false
        Price = price;
        StockLevel = stockLevel;
        ImageUrl = imageUrl;
    }

    // Override ToString method for better string representation
    public override string ToString()
    {
        return $"Product ID: {ProductId}, Name: {ProductName}, Category ID: {CategoryId}, Allergies: {Allergies}, Allergy Type: {AllergyType}, Price: {Price:C}, Stock Level: {StockLevel}";
    }
}

}