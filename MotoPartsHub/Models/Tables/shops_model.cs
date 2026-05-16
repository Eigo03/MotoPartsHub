using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class shops_model
    {
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public string Location { get; set; }
        public string ContactNo { get; set; }
        public int IsActive { get; set; }
    }
}