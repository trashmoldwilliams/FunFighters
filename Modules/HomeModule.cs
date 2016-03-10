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
      Post["/confirm_fighter"] =_=> {
        Fighter newFighter = new Fighter(Request.Form["name"], Request.Form["imageSelection"], Request.Form["input_hp"], Request.Form["input_mp"], Request.Form["input_attack"], Request.Form["input_speed"], Request.Form["input_accuracy"], Request.Form["input_luck"]);
        newFighter.Save();
        return View ["index.cshtml"];
        newFighter.Save();
      };
      Post["/UpdateFighters"] =_ => {
        Fighter leftFighter = Fighter.Find(Request.Form["player1"]);
        leftFighter.UpdateRecord(Request.Form["player1Wins"],Request.Form["player1Losses"]);
        Fighter rightFighter = Fighter.Find(Request.Form["player2"]);
        rightFighter.UpdateRecord(Request.Form["player2Wins"],Request.Form["player2Losses"]);
        Dictionary<int,Fighter> returnDictionary = new Dictionary<int,Fighter>{};
        returnDictionary.Add(1,leftFighter);
        returnDictionary.Add(2,rightFighter);
        return View["get_fighters.cshtml",returnDictionary];
      };
      Post["/GetFighters"] = _ => {
        Fighter player1 = Fighter.Find(Request.Form["player1"]);
        Fighter player2 = Fighter.Find(Request.Form["player2"]);
        Dictionary<int,Fighter> returnDictionary = new Dictionary<int,Fighter>{};
        returnDictionary.Add(1,player1);
        returnDictionary.Add(2,player2);
        return View["get_fighters.cshtml",returnDictionary];
      };
      Get["/fight"] = _ => {
        return View["fight.cshtml",Fighter.GetAll()];
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
