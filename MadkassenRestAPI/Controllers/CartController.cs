using MadkassenRestAPI.Models;
using MadkassenRestAPI.Services;
using MadkassenRestAPI.Data;
using Microsoft.AspNetCore.Mvc;
using ClassLibrary;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly CartService _cartService;

    public CartController(CartService cartService)
    {
        _cartService = cartService;
    }

    // Get Cart Items for a specific user
    [HttpGet("get-cart-items")]
public async Task<IActionResult> GetCartItems(int userId)
{
    try
    {
        var cartItems = await _cartService.GetCartItemsByUserIdAsync(userId);

        if (cartItems == null || cartItems.Count == 0)
        {
            return Ok(new List<CartItemDto>()); // Return empty list if no items
        }

        return Ok(cartItems); // Return cart items including product details
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}


    // Add an item to the cart
    [HttpPost("add-to-cart")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
    {
        if (request == null || request.Quantity <= 0)
        {
            return BadRequest("Invalid request.");
        }

        try
        {
            await _cartService.AddToCartAsync(request.ProductId, request.UserId, request.Quantity);
            return Ok("Item added to cart.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // Update the quantity of an item in the cart
    [HttpPut("update-cart-item")]
    public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartRequest request)
    {
        try
        {
            await _cartService.UpdateCartItemAsync(request.ProductId, request.UserId, request.Quantity);
            return Ok("Cart item updated.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // Remove an item from the cart
    [HttpDelete("remove-cart-item")]
    public async Task<IActionResult> RemoveCartItem([FromQuery] int productId, [FromQuery] int? userId)
    {
        try
        {
            await _cartService.RemoveCartItemAsync(productId, userId);
            return Ok("Cart item removed successfully.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
