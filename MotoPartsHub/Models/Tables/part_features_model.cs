using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class part_features_model
    {
        public int FeatureId { get; set; }
        public int PartId { get; set; }
        public string Feature { get; set; }
    }
}