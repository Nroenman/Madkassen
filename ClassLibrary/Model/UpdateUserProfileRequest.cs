namespace ClassLibrary.Model
{
    public class UpdateUserProfileRequest
    {
        public string OldPassword { get; set; }  
        public string NewPassword { get; set; }  
        public string Email { get; set; }      
    }
}