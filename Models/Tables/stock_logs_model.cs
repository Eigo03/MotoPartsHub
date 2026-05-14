using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class stock_logs_model
    {
        public int LogId { get; set; }
        public int PartId { get; set; }
        public int ChangedBy { get; set; }
        public int OldStock { get; set; }
        public int NewStock { get; set; }
        public string Reason { get; set; }
        public DateTime ChangedAt { get; set; }
    }
}