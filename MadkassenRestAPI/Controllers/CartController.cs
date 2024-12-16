using MadkassenRestAPI.Models;
using MadkassenRestAPI.Services;  // Add using statement for CartService
using Microsoft.AspNetCore.Mvc;
using ClassLibrary;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly CartService _cartService;

    public CartController(CartService cartService)
    {
        _cartService = cartService;
    }

    // Add item to the cart
    [HttpPost("add-to-cart")]
    public async Task<IActionResult> AddToCart(int productId, int? userId, int quantity)
    {
        try
        {
            await _cartService.AddToCartAsync(productId, userId, quantity);
            return Ok("Item added to cart");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // Update item quantity in the cart
    [HttpPut("update-cart-item")]
    public async Task<IActionResult> UpdateCartItem(int productId, int? userId, int quantity)
    {
        try
        {
            await _cartService.UpdateCartItemAsync(productId, userId, quantity);
            return Ok("Item quantity updated");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // Remove item from the cart
    [HttpDelete("remove-from-cart")]
    public async Task<IActionResult> RemoveFromCart(int productId, int? userId)
    {
        try
        {
            await _cartService.RemoveFromCartAsync(productId, userId);
            return Ok("Item removed from cart");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

