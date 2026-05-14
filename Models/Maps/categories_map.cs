using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class categories_map : EntityTypeConfiguration<categories_model>
    {
        public categories_map()
        {
            HasKey(i => i.CategoryId);
            ToTable("categories");
        }
    }
}