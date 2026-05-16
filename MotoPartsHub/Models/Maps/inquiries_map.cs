using MotoPartsHub.Models.Tables;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Maps
{
    public class inquiries_map : EntityTypeConfiguration<inquiries_model>
    {
        public inquiries_map()
        {
            HasKey(i => i.InquiryId);
            ToTable("inquiries");
        }
    }
}