using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class shops_map : EntityTypeConfiguration<shops_model>
    {
        public shops_map()
        {
            HasKey(i => i.ShopId);
            ToTable("shops");
        }
    }
}