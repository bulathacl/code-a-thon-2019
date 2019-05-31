using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodathonTeam2API.Contracts
{
    public interface ICodathonAppContext
    {
      string AccessToken { get; set; }
    }
}
