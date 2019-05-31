using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CodathonTeam2API.Contracts;
using CodathonTeam2API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CodathonTeam2API.Controllers
{

  [Route("api/[controller]")]
  public class QaController : Controller
  {
    private ICodathonAppContext _context;

    public QaController(ICodathonAppContext context)
    {
      _context = context;
    }


    // GET api/values
    [HttpGet]
    public async Task<IEnumerable<string>> Get()
    {
      using (var client = new HttpClient())
      {
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _context.AccessToken);

        UriBuilder builder = new UriBuilder("https://team2-p77f5g-api.azurewebsites.net/api/v1/applications")
        {
         // Query = $"TenantId={var1}&JobId={var2}"
        };

        var response = await client.GetAsync(builder.Uri);

        if (response.IsSuccessStatusCode)
        {
          var res = await response.Content.ReadAsStringAsync();
          var obj = JsonConvert.DeserializeObject<WorkbenchApplicationDetail>(res);
        }
        else
        {
          throw new UnauthorizedAccessException();
        }

      }
        return new string[] { "qa1", "qa2" };
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
      // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
      // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
    }
  }
}
