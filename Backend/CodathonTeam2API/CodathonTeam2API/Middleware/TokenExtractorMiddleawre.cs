using CodathonTeam2API.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodathonTeam2API.Middleware
{
  public class TokenExtractorMiddleawre
  {
    private readonly RequestDelegate _next;
    public TokenExtractorMiddleawre(RequestDelegate next)
    {
      _next = next;
    }

    public Task Invoke(HttpContext httpContext, ICodathonAppContext context)
    {
      var accesToken = httpContext.Request.Headers["Authorization"];
      if(accesToken.FirstOrDefault() != null)
      context.AccessToken = accesToken[0].Substring(7, accesToken[0].Length - 7);
      return _next(httpContext);
    }

  }

  public static class TaskExtractorMiddlewareExtensions
  {
    public static IApplicationBuilder UseTokenExtractorMiddleware(this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<TokenExtractorMiddleawre>();
    }
  }
}

