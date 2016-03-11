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
        List<Fighter> allFighters = Fighter.GetAll();
        return View["index.cshtml", allFighters];
      };
      Get["/add_fighter"] = _ => {
        List<Image> allImages = Image.GetAll();
        return View["add_fighter.cshtml", allImages];
      };
      Post["/confirm_fighter"] =_=> {
        Fighter newFighter = new Fighter(Request.Form["name"], Request.Form["imageSelection"], Request.Form["input_hp"], Request.Form["input_mp"], Request.Form["input_attack"], Request.Form["input_speed"], Request.Form["input_accuracy"], Request.Form["input_luck"]);
        newFighter.Save();
        List<Fighter> allFighters = Fighter.GetAll();
        return View ["index.cshtml",allFighters];
      };
      Post["/update_fighter/{id}"] = parameters => {
        Fighter foundFighter = Fighter.Find(parameters.id);
        foundFighter.Update(Request.Form["name"], Request.Form["imageSelection"], Request.Form["input_hp"], Request.Form["input_mp"], Request.Form["input_attack"], Request.Form["input_speed"], Request.Form["input_accuracy"], Request.Form["input_luck"]);
        List<Fighter> allFighters = Fighter.GetAll();
        return View ["index.cshtml",allFighters];
      };
      Post["/UpdateFighters"] =_ => {
        Fighter leftFighter = Fighter.Find(Request.Form["player1"]);
        leftFighter.UpdateRecord(Int32.Parse(Request.Form["player1Wins"]),Int32.Parse(Request.Form["player1Losses"]));
        Fighter rightFighter = Fighter.Find(Request.Form["player2"]);
        rightFighter.UpdateRecord(Int32.Parse(Request.Form["player2Wins"]),Int32.Parse(Request.Form["player2Losses"]));
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
      Get["/update/{id}"]  = parameters => {
        Fighter foundFighter = Fighter.Find(parameters.id);
        List<Image> allImages = Image.GetAll();
        Dictionary<string,object> returnDictionary = new Dictionary<string,object>{};
        returnDictionary.Add("fighter", foundFighter);
        returnDictionary.Add("images", allImages);
        return View["update_fighter.cshtml",returnDictionary];
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
