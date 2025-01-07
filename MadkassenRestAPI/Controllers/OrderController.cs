using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using ClassLibrary.Model;

namespace MadkassenRestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController(
        OrderService orderService,
        IConfiguration configuration,
        ILogger<OrderController> logger)
        : ControllerBase
    {
        private readonly OrderService _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        private readonly ILogger<OrderController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            try
            {
                var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                if (string.IsNullOrEmpty(token))
                {
                    _logger.LogWarning("No token provided.");
                    return Unauthorized(new { Message = "No token provided." });
                }

                var userProfile = await GetUserProfileFromToken(token);
                if (userProfile == null)
                {
                    _logger.LogWarning("Invalid or expired token.");
                    return Unauthorized(new { Message = "Invalid or expired token." });
                }

                var userId = int.Parse(userProfile.UserId);

                // Create the order based on cart items for the user
                var orderId = await _orderService.CreateOrderAsync(userId);

                return Ok(new { Message = "Order created successfully", OrderId = orderId });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in Checkout: {ex.Message}", ex);
                return BadRequest(new { Message = "Error: " + ex.Message });
            }
        }


        private async Task<UserProfile> GetUserProfileFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
                var userId = jwtToken?.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

                if (userId == null)
                {
                    return null;
                }

                return new UserProfile
                {
                    UserId = userId
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
