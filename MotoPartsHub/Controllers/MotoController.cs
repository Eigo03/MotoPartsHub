using System;
using System.Linq;
using System.Web.Mvc;
using MotoPartsHub.Models.Context;

namespace MotoPartsHub.Controllers
{
    public class MotoController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RegAndLog()
        {
            return View();
        }

        public ActionResult LandingPage()
        {
            return View();
        }

        // GET ALL PARTS for Landing Page catalog
        public JsonResult GetParts()
        {
            try
            {
                using (var connect = new MotoContext())
                {
                    var parts = connect.parts
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

                    var categories = connect.categories
                        .Select(c => new { c.CategoryId, c.CategoryName })
                        .ToList();

                    var shops = connect.shops
                        .Where(s => s.IsActive == 1)
                        .Select(s => new { s.ShopId, s.ShopName })
                        .ToList();

                    return Json(new { success = true, parts = parts, categories = categories, shops = shops }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}