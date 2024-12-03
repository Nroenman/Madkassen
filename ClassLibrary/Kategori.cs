public class Kategori
{
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? Description { get; set; }

    // Default constructor
    public Kategori() { }

    // constructor
    public Kategori(int categoryId, string categoryName, string description)
    {
        CategoryId = categoryId;
        CategoryName = categoryName;
        Description = description;
    }

    // Override ToString method for better string representation
    public override string ToString()
    {
        return $"Category ID: {CategoryId}, Name: {CategoryName}, Description: {Description}";
    }
}
