using System;
using System.Linq;
using System.Web.Mvc;
using MotoPartsHub.Models.Context;
using MotoPartsHub.Models.Tables;

namespace MotoPartsHub.Controllers
{
    public class AdminController : Controller
    {
        // ─────────────────────────────────────────────────────────────
        //  DASHBOARD & TEST
        // ─────────────────────────────────────────────────────────────
        public ActionResult AdminDashboard() { return View(); }

        public string TestDB()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var count = db.categories.Count();
                    return "Connected. Total categories: " + count;
                }
            }
            catch (Exception ex) { return ex.Message; }
        }

        // ─────────────────────────────────────────────────────────────
        //  CATEGORIES
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetCategories()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.categories
                        .Select(c => new { c.CategoryId, c.CategoryName, c.Description })
                        .ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult AddCategory(categories_model category)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var exists = db.categories.Any(c => c.CategoryName == category.CategoryName);
                    if (exists)
                        return Json(new { success = false, message = "Category name already exists." });

                    db.categories.Add(category);
                    db.SaveChanges();
                    return Json(new { success = true, message = "Category added successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EditCategory(categories_model category)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var existing = db.categories.Find(category.CategoryId);
                    if (existing == null)
                        return Json(new { success = false, message = "Category not found." });

                    existing.CategoryName = category.CategoryName;
                    existing.Description = category.Description;
                    db.SaveChanges();
                    return Json(new { success = true, message = "Category updated successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult DeleteCategory(int categoryId)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var inUse = db.parts.Any(p => p.CategoryId == categoryId);
                    if (inUse)
                        return Json(new { success = false, message = "Cannot delete. This category is being used by existing parts." });

                    var existing = db.categories.Find(categoryId);
                    if (existing == null)
                        return Json(new { success = false, message = "Category not found." });

                    db.categories.Remove(existing);
                    db.SaveChanges();
                    return Json(new { success = true, message = "Category deleted successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        // ─────────────────────────────────────────────────────────────
        //  SHOPS
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetShops()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.shops
                        .Select(s => new { s.ShopId, s.ShopName, s.Location, s.ContactNo, s.IsActive })
                        .ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult AddShop(shops_model shop)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    shop.IsActive = 1;
                    db.shops.Add(shop);
                    db.SaveChanges();
                    return Json(new { success = true, message = "Shop added successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EditShop(shops_model shop)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var existing = db.shops.Find(shop.ShopId);
                    if (existing == null)
                        return Json(new { success = false, message = "Shop not found." });

                    existing.ShopName = shop.ShopName;
                    existing.Location = shop.Location;
                    existing.ContactNo = shop.ContactNo;
                    db.SaveChanges();
                    return Json(new { success = true, message = "Shop updated successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult DeleteShop(int shopId)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var inUse = db.parts.Any(p => p.ShopId == shopId && p.IsActive == 1);
                    if (inUse)
                        return Json(new { success = false, message = "Cannot delete. This shop has active parts in the catalog." });

                    var existing = db.shops.Find(shopId);
                    if (existing == null)
                        return Json(new { success = false, message = "Shop not found." });

                    existing.IsActive = 0;
                    db.SaveChanges();
                    return Json(new { success = true, message = "Shop deactivated successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        // ─────────────────────────────────────────────────────────────
        //  PARTS
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetParts()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.parts
                        .Where(p => p.IsActive == 1)
                        .Select(p => new {
                            p.PartId,
                            p.PartName,
                            p.SKU,
                            p.Brand,
                            p.CategoryId,
                            p.ShopId,
                            p.Price,
                            p.Stock,
                            p.ShortDesc,
                            p.Compatibility,
                            p.Weight
                        }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult AddPart(parts_model part)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    part.IsActive = 1;
                    part.CreatedAt = DateTime.Now;
                    part.UpdatedAt = DateTime.Now;
                    db.parts.Add(part);
                    db.SaveChanges();

                    if (part.Stock > 0)
                    {
                        db.stock_logs.Add(new stock_logs_model
                        {
                            PartId = part.PartId,
                            ChangedBy = 1,
                            OldStock = 0,
                            NewStock = part.Stock,
                            Reason = "Initial stock on part creation",
                            ChangedAt = DateTime.Now
                        });
                        db.SaveChanges();
                    }

                    return Json(new { success = true, message = "Part added successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EditPart(parts_model part)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var existing = db.parts.Find(part.PartId);
                    if (existing == null)
                        return Json(new { success = false, message = "Part not found." });

                    int oldStock = existing.Stock;

                    existing.PartName = part.PartName;
                    existing.SKU = part.SKU;
                    existing.Brand = part.Brand;
                    existing.CategoryId = part.CategoryId;
                    existing.ShopId = part.ShopId;
                    existing.Price = part.Price;
                    existing.Stock = part.Stock;
                    existing.ShortDesc = part.ShortDesc;
                    existing.Compatibility = part.Compatibility;
                    existing.Weight = part.Weight;
                    existing.UpdatedAt = DateTime.Now;
                    db.SaveChanges();

                    if (oldStock != part.Stock)
                    {
                        db.stock_logs.Add(new stock_logs_model
                        {
                            PartId = part.PartId,
                            ChangedBy = 1,
                            OldStock = oldStock,
                            NewStock = part.Stock,
                            Reason = "Stock updated via admin edit",
                            ChangedAt = DateTime.Now
                        });
                        db.SaveChanges();
                    }

                    return Json(new { success = true, message = "Part updated successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult DeletePart(int partId)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var existing = db.parts.Find(partId);
                    if (existing == null)
                        return Json(new { success = false, message = "Part not found." });

                    existing.IsActive = 0;
                    existing.UpdatedAt = DateTime.Now;
                    db.SaveChanges();
                    return Json(new { success = true, message = "Part deleted successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        // ─────────────────────────────────────────────────────────────
        //  USERS
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetUsers()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.users
                        .Where(u => u.RoleId == 2)
                        .Select(u => new {
                            u.UserId,
                            u.FirstName,
                            u.LastName,
                            u.Username,
                            u.Phone,
                            u.CreatedAt,
                            u.IsActive
                        }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DeactivateUser(int userId)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var user = db.users.Find(userId);
                    if (user == null)
                        return Json(new { success = false, message = "User not found." });

                    user.IsActive = user.IsActive == 1 ? 0 : 1;
                    db.SaveChanges();
                    string status = user.IsActive == 1 ? "activated" : "deactivated";
                    return Json(new { success = true, message = "User " + status + " successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult RegisterUser(users_model user)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var exists = db.users.Any(u => u.Username == user.Username);
                    if (exists)
                        return Json(new { success = false, message = "Username already taken." });

                    user.RoleId = 2;
                    user.IsActive = 1;
                    user.CreatedAt = DateTime.Now;
                    db.users.Add(user);
                    db.SaveChanges();
                    return Json(new { success = true, message = "Registered successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var user = db.users
                        .Where(u => u.Username == username && u.Password == password && u.IsActive == 1)
                        .Select(u => new {
                            u.UserId,
                            u.FirstName,
                            u.LastName,
                            u.Username,
                            u.RoleId
                        }).FirstOrDefault();

                    if (user == null)
                        return Json(new { success = false, message = "Invalid username or password." });

                    return Json(new { success = true, data = user });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        // ─────────────────────────────────────────────────────────────
        //  INQUIRIES
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetInquiries()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.inquiries
                        .OrderByDescending(i => i.CreatedAt)
                        .Select(i => new {
                            i.InquiryId,
                            i.UserId,
                            i.PartId,
                            i.Message,
                            i.Status,
                            i.CreatedAt
                        }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult SaveInquiry(inquiries_model inquiry)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    inquiry.Status = "Pending";
                    inquiry.CreatedAt = DateTime.Now;
                    db.inquiries.Add(inquiry);
                    db.SaveChanges();
                    return Json(new { success = true, message = "Inquiry submitted successfully!" });
                }
            }
            catch (Exception ex) { return Json(new { success = false, message = ex.Message }); }
        }

        [HttpPost]
        public JsonResult UpdateInquiryStatus(int inquiryId, string status, string adminResponse = null)
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var inquiry = db.inquiries.Find(inquiryId);
                    if (inquiry == null)
                        return Json(new { success = false, message = "Inquiry not found." });

                    inquiry.Status = status;

                    if (!string.IsNullOrWhiteSpace(adminResponse))
                    {
                        inquiry.AdminResponse = adminResponse;
                    }

                    db.SaveChanges();
                    return Json(new { success = true, message = "Inquiry updated!" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        // ─────────────────────────────────────────────────────────────
        //  STOCK LOGS
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetStockLogs()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = (from s in db.stock_logs
                                join p in db.parts on s.PartId equals p.PartId into pg
                                from p in pg.DefaultIfEmpty()
                                join c in db.categories on (p != null ? p.CategoryId : 0) equals c.CategoryId into cg
                                from c in cg.DefaultIfEmpty()
                                join sh in db.shops on (p != null ? p.ShopId : 0) equals sh.ShopId into shg
                                from sh in shg.DefaultIfEmpty()
                                orderby s.ChangedAt descending
                                select new
                                {
                                    s.LogId,
                                    s.PartId,
                                    PartName = p != null ? p.PartName : "(deleted part)",
                                    SKU = p != null ? p.SKU : "",
                                    CategoryName = c != null ? c.CategoryName : "—",
                                    ShopName = sh != null ? sh.ShopName : "—",
                                    s.OldStock,
                                    s.NewStock,
                                    Change = s.NewStock - s.OldStock,
                                    ChangeType = s.NewStock > s.OldStock ? "Stock In"
                                               : s.NewStock < s.OldStock ? "Stock Out"
                                               : "No Change",
                                    s.Reason,
                                    s.ChangedAt
                                }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // ─────────────────────────────────────────────────────────────
        //  REPORTS SUMMARY
        // ─────────────────────────────────────────────────────────────
        public JsonResult GetReportSummary()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var totalParts = db.parts.Count(p => p.IsActive == 1);
                    var inStock = db.parts.Count(p => p.IsActive == 1 && p.Stock > 5);
                    var lowStock = db.parts.Count(p => p.IsActive == 1 && p.Stock > 0 && p.Stock <= 5);
                    var outOfStock = db.parts.Count(p => p.IsActive == 1 && p.Stock == 0);
                    var totalUsers = db.users.Count(u => u.RoleId == 2);
                    var totalInquiries = db.inquiries.Count();

                    var byCategory = db.categories.Select(c => new {
                        c.CategoryName,
                        Count = db.parts.Count(p => p.CategoryId == c.CategoryId && p.IsActive == 1)
                    }).ToList();

                    var byShop = db.shops.Where(s => s.IsActive == 1).Select(s => new {
                        s.ShopName,
                        Count = db.parts.Count(p => p.ShopId == s.ShopId && p.IsActive == 1)
                    }).ToList();

                    return Json(new
                    {
                        success = true,
                        totalParts,
                        inStock,
                        lowStock,
                        outOfStock,
                        totalUsers,
                        totalInquiries,
                        byCategory,
                        byShop
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // ─────────────────────────────────────────────────────────────
        //  DASHBOARD CHARTS
        // ─────────────────────────────────────────────────────────────

        // Chart 1: Parts per Category
        public JsonResult GetPartsPerCategory()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.categories.Select(c => new {
                        Label = c.CategoryName,
                        Count = db.parts.Count(p => p.CategoryId == c.CategoryId && p.IsActive == 1)
                    }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // Chart 2: Parts per Shop
        public JsonResult GetPartsPerShop()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var data = db.shops
                        .Where(s => s.IsActive == 1)
                        .Select(s => new {
                            Label = s.ShopName,
                            Count = db.parts.Count(p => p.ShopId == s.ShopId && p.IsActive == 1)
                        }).ToList();
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // Chart 3: Stock Status Summary
        public JsonResult GetStockStatusSummary()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var activeParts = db.parts.Where(p => p.IsActive == 1);
                    var outOfStock = activeParts.Count(p => p.Stock == 0);
                    var lowStock = activeParts.Count(p => p.Stock > 0 && p.Stock <= 5);
                    var inStock = activeParts.Count(p => p.Stock > 5);

                    var data = new[]
                    {
                        new { Label = "Out of Stock", Count = outOfStock },
                        new { Label = "Low Stock",    Count = lowStock },
                        new { Label = "In Stock",     Count = inStock }
                    };
                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // Chart 4: Stock Changes Over Time
        public JsonResult GetStockChangesOverTime()
        {
            try
            {
                using (var db = new MotoContext())
                {
                    var raw = db.stock_logs.ToList();

                    var data = raw
                        .GroupBy(x => x.ChangedAt.Date)
                        .OrderBy(g => g.Key)
                        .Select(g => new
                        {
                            Label = g.Key.ToString("MMM dd"),
                            Count = g.Count()
                        })
                        .ToList();

                    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}