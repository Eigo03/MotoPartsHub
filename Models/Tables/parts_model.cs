using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class parts_model
    {
        public int PartId { get; set; }
        public string PartName { get; set; }
        public string SKU { get; set; }
        public string Brand { get; set; }
        public int CategoryId { get; set; }
        public int ShopId { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string ShortDesc { get; set; }
        public string Compatibility { get; set; }
        public string Weight { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}