using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class inquiries_model
    {
        public int InquiryId { get; set; }
        public int UserId { get; set; }
        public int PartId { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public string AdminResponse { get; set; }
    }
}