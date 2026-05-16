using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class part_specs_model
    {
        public int SpecId { get; set; }
        public int PartId { get; set; }
        public string SpecKey { get; set; }
        public string SpecValue { get; set; }
    }
}