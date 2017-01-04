using Microsoft.AspNetCore.Mvc;

namespace Reactube.NET.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var model = new[] {
               new { id = "bakerloo",          name = "Bakerloo",           modeName = "tube" },
               new { id = "central",           name = "Central",            modeName = "tube" },
               new { id = "circle",            name = "Circle",             modeName = "tube" },
               new { id = "district",          name = "District",           modeName = "tube" },
               new { id = "hammersmith-city",  name = "Hammersmith & City", modeName = "tube" },
               new { id = "jubilee",           name = "Jubilee",            modeName = "tube" },
               new { id = "metropolitan",      name = "Metropolitan",       modeName = "tube" },
               new { id = "northern",          name = "Northern",           modeName = "tube" },
               new { id = "piccadilly",        name = "Piccadilly",         modeName = "tube" },
               new { id = "victoria",          name = "Victoria",           modeName = "tube" },
               new { id = "waterloo-city",     name = "Waterloo & City",    modeName = "tube" },
               new { id = "london-overground", name = "London Overground",  modeName = "overground" },
               new { id = "tfl-rail",          name = "TfL Rail",           modeName = "tflrail" },
               new { id = "dlr",               name = "DLR",                modeName = "dlr" },
               new { id = "tram",              name = "Tram",               modeName = "tram" }
            };
            return View(model);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
