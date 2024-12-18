using MadkassenRestAPI.Services;

namespace MadkassenRestAPI.Middleware;

public class JwtMiddleware(RequestDelegate next, ILogger<JwtMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context, IUserService userService)
    {
        var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        if (!string.IsNullOrEmpty(token))
        {
            try
            {
                var user = userService.GetUserFromJwtToken(token);
                context.Items["User"] = user;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while processing the JWT token.");
                // Optionally, add response to indicate failure (e.g., 401 Unauthorized)
            }
        }

        await next(context);
    }
}