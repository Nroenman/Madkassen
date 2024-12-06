namespace ClassLibrary 
{



public class Users {

public int UserId {get; set;}

public required string UserName { get; set; }

public required string Email { get; set; }

public required string PasswordHash { get; set; }

public DateTime CreatedAt { get; set; }

public DateTime UpdatedAt {get; set;}

public required string Roles { get; set; }



public Users()
{
    
}

public Users(int userId, string userName, string email, string passwordHash, DateTime createdAt, DateTime updatedAt, string roles)
{
    UserId = userId;
    UserName = userName;
    Email = email;
    PasswordHash = passwordHash;
    CreatedAt = createdAt;
    UpdatedAt = updatedAt;
    Roles = roles;
}

public override string ToString()
    {
        return $"User ID: {UserId}, Name: {UserName}, Email: {Email}, Password: {PasswordHash}, Created At: {CreatedAt}, Updated At: {UpdatedAt}, Roles: {Roles}";
    }


}
}