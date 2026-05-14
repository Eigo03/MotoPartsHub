using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class stock_logs_map : EntityTypeConfiguration<stock_logs_model>
    {
        public stock_logs_map()
        {
            HasKey(i => i.LogId);
            ToTable("stock_logs");
        }
    }
}