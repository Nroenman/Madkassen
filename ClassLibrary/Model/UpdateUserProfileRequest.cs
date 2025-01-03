namespace ClassLibrary.Model
{
    public class UpdateUserProfileRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}