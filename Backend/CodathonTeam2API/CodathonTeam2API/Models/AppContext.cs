using CodathonTeam2API.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodathonTeam2API.Models
{
  public class CodathonAppContext : ICodathonAppContext
  {
    public string AccessToken { get; set; }
  }
}
