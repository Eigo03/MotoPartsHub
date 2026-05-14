using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class roles_map : EntityTypeConfiguration<roles_model>
    {
        public roles_map()
        {
            HasKey(i => i.RoleId);
            ToTable("roles");
        }
    }
}