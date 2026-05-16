using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class part_specs_map : EntityTypeConfiguration<part_specs_model>
    {
        public part_specs_map()
        {
            HasKey(i => i.SpecId);
            ToTable("part_specs");
        }
    }
}