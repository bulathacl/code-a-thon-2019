using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodathonTeam2API.Models
{
    public class WorkbenchApplicationDetail
    {
    public string NextLink { get; set; }
    public List<WorkbenchApplication> Applications { get; set; }
  }
}
