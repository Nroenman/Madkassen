using JWT.Algorithms;
using JWT.Builder;
using MadkassenRestAPI.Models;
using MadkassenRestAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;

namespace MadkassenRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserService userService, IConfiguration configuration) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<string> Login(AuthInput input)
        {
            try
            {
                // Authenticate the user
                var user = userService.Authenticate(input.Email, input.Password);
                if (user == null)
                {
                    return Unauthorized(new { Message = "Incorrect email or password." });
                }

                // Generate JWT token
                var token = JwtBuilder.Create()
                    .WithAlgorithm(new HMACSHA256Algorithm()) // Set the signing algorithm
                    .WithSecret(configuration["AppSettings:Token"]) // Secret key from appsettings
                    .Subject(user.Username) // User information in the token
                    .Issuer(configuration["AppSettings:Issuer"]) // Issuer from config
                    .Audience(configuration["AppSettings:Audience"]) // Audience from config
                    .IssuedAt(DateTimeOffset.Now.DateTime) // Token issue date
                    .ExpirationTime(DateTimeOffset.Now.AddHours(12).DateTime) // Expiration time
                    .NotBefore(DateTimeOffset.Now.DateTime) // Token valid from this time
                    .Id(Guid.NewGuid().ToString()) // Unique ID for the token
                    .Encode(); // Encode the JWT token

                // Return the token to the user
                return Ok(new { Token = token });
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                // General exception handling for any unforeseen errors
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while processing your request.", Details = ex.Message });
            }
        }
    }
}
