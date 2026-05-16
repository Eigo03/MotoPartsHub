using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class part_features_map : EntityTypeConfiguration<part_features_model>
    {
        public part_features_map()
        {
            HasKey(i => i.FeatureId);
            ToTable("part_features");
        }
    }
}