using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class users_map : EntityTypeConfiguration<users_model>
    {
        public users_map()
        {
            HasKey(i => i.UserId);
            ToTable("users");
        }
    }
}