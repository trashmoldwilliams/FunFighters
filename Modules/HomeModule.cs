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
        return View["index.cshtml"];
      };
      Get["/add_fighter"] = _ => {
        List<Image> allImages = Image.GetAll();
        return View["add_fighter.cshtml", allImages];
      };
      Get["/fighters.xml"] = _ => {
        return View["get_fighters.cshtml",Fighter.GetAll()];
      };
      Get["/fight"] = _ => {
        return View["fight.cshtml"];
      };
      Post["/fight"] = _ => {
        return View["fight.cshtml"];
      };
      Get["/image"] = _ => {
        return View["image.cshtml",Image.GetAll()];
      };
      Post["/image"] = _ => {
        Image newImage = new Image(Request.Form["name"],Request.Form["path"]);
        newImage.Save();
        return View["image.cshtml", Image.GetAll()];
      };
      Get["/image/{id}"]  = parameters => {
        Image newImage = Image.Find(parameters.id);
        Dictionary<string,object> myDictionary = new Dictionary<string,object>{};
        myDictionary.Add("image",newImage);
        return View["imageView.cshtml",myDictionary];
      };
      Post["/image/Update/{id}"]  = parameters => {
        Image newImage = Image.Find(parameters.id);
        newImage.Update(Request.Form["name"],Request.Form["path"]);
        return View["image.cshtml",Image.GetAll()];
      };
      Get["/image/Delete/{id}"]  = parameters => {
        Image newImage = Image.Find(parameters.id);
        newImage.Delete();
        return View["image.cshtml",Image.GetAll()];
      };
      Get["/image/Create"]  = _ => {
        return View["imageCreate.cshtml"];
      };
      Get["/image/Delete"] = _ => {
        Image.DeleteAll();
        return View["image.cshtml",  "delete"];
      };
    }
  }
}
