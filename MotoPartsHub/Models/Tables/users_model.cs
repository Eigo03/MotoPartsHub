using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MotoPartsHub.Models.Tables
{
    public class users_model
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int IsActive { get; set; }
    }
}