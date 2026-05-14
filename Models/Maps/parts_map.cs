using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class parts_map : EntityTypeConfiguration<parts_model>
    {
        public parts_map()
        {
            HasKey(i => i.PartId);
            ToTable("parts");
        }
    }
}