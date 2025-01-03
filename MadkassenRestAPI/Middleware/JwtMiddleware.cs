using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace MadkassenRestAPI.Middleware
{
    public class JwtMiddleware(RequestDelegate next, IConfiguration configuration, ILogger<JwtMiddleware> logger)
    {
        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(token))
            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = System.Text.Encoding.ASCII.GetBytes(configuration["AppSettings:Token"]);

                    var validationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = configuration["AppSettings:Issuer"],
                        ValidAudience = configuration["AppSettings:Audience"],
                        ClockSkew = TimeSpan.Zero // No tolerance for clock skew
                    };

                    var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                    var userId = principal.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

                    if (userId != null)
                    {
                        context.Items["User"] = userId;
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError($"JWT Token validation failed: {ex.Message}");
                }
            }
            else
            {
                // Log if no token was provided
                logger.LogWarning("No token provided in request.");
            }

            // Proceed with the next middleware
            await next(context);
        }
    }
}
