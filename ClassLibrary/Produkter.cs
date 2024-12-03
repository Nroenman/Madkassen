public enum AllergyType
{
    Gluten,
    Dairy,
    Nuts,
    Shellfish,
    Soy,
    Eggs
}

public class Produkter
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public bool Allergies { get; set; }
    public AllergyType AllergyType { get; set; }
    public double Price { get; set; }
    public int StockLevel { get; set; }

    // Default constructor
    public Produkter() { }

    // Parameterized constructor for easier object creation
    public Produkter(int productId, string productName, string description, int categoryId, bool allergies, AllergyType allergyType, double price, int stockLevel)
    {
        ProductId = productId;
        ProductName = productName;
        Description = description;
        CategoryId = categoryId;
        Allergies = allergies;
        AllergyType = allergyType;
        Price = price;
        StockLevel = stockLevel;
    }

    // Override ToString method for better string representation
    public override string ToString()
    {
        return $"Product ID: {ProductId}, Name: {ProductName}, Category ID: {CategoryId}, Allergies: {Allergies}, Allergy Type: {AllergyType}, Price: {Price:C}, Stock Level: {StockLevel}";
    }
}
