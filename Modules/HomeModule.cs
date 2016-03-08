using System;
using System.Collections.Generic;
using Nancy;
using Nancy.ViewEngines.Razor;

namespace Fighters
{
  public class HomeModule : NancyModule
  {
    public HomeModule()
    {
      Get["/"] = _ => {
        
        return View["add_fighter.cshtml"];
      };
      Get["/fighters.xml"] = _ => {
        return View["get_fighters.cshtml",Fighter.GetAll()];
      };
      Get["/fight"] = _ => {
        return View["fight.cshtml"];
      };
    }
  }
}
