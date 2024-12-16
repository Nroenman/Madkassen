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
                    .WithAlgorithm(new HMACSHA256Algorithm()) 
                    .WithSecret(configuration["AppSettings:Token"]) 
                    .Subject(user.Username) 
                    .Issuer(configuration["AppSettings:Issuer"])
                    .Audience(configuration["AppSettings:Audience"])
                    .IssuedAt(DateTimeOffset.Now.DateTime)
                    .ExpirationTime(DateTimeOffset.Now.AddHours(1).DateTime) 
                    .NotBefore(DateTimeOffset.Now.DateTime) 
                    .Id(Guid.NewGuid().ToString()) 
                    .Encode();

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
