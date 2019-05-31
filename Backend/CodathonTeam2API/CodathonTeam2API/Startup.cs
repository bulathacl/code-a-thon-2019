using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CodathonTeam2API.Middleware;
using CodathonTeam2API.Contracts;
using CodathonTeam2API.Models;

namespace CodathonTeam2API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddScoped<ICodathonAppContext, CodathonAppContext>();

      services.AddAuthentication(sharedOptions =>
      {
        sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddAzureAdBearer(options => Configuration.Bind("AzureAd", options));

      services.AddMvc();
      //services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      //List<string> corsDomains = new List<string>();
      //Configuration.Bind("CorsDomains", corsDomains);

      //app.UseCors(builder =>
      //    builder.WithOrigins(corsDomains.ToArray())
      //    .AllowAnyHeader()
      //    .AllowAnyMethod()
      //    .AllowCredentials()
      //    .SetPreflightMaxAge(TimeSpan.FromDays(14)));

      app.UseTokenExtractorMiddleware();
      //app.UseAuthentication();
      app.UseMvc();
    }
  }
}
