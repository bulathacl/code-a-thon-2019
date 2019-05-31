using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodathonTeam2API.Models
{
    public class WorkbenchApplication
    {
    public int Id { get; set; }
    public string Version { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string DisplayName { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime CreatedDtTm { get; set; }
    public bool Enabled { get; set; }
    public string BlobStorageURL { get; set; }
    //public string IsLatestVersion { get; set; }
    //public string[] ApplicationRoles { get; set; }
  }
}
