var GetFighters = function(){
  var fighters = [];
  if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    xhr = new XMLHttpRequest();
  }
  xhr.overrideMimeType('text/xml');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var xml = xhr.responseXML;
      var getFighters = xml.documentElement.getElementsByTagName("fighter");

      for (var i = 0; i < getFighters.length; i++) {
        var fighterName = getFighters[i].getAttribute("name");
        var fighterWins = getFighters[i].getAttribute("wins");
        var fighterLosses = getFighters[i].getAttribute("losses");
        var fighterImages = getFighters[i].getAttribute("image");
        var fighterHp = getFighters[i].getAttribute("hp");
        var fighterMp = getFighters[i].getAttribute("mp");
        var fighterAttack = getFighters[i].getAttribute("attack");
        var fighterSpeed = getFighters[i].getAttribute("speed");
        var fighterAccuracy = getFighters[i].getAttribute("accuracy");
        var fighterLuck = getFighters[i].getAttribute("luck");
        var newFighter = [fighterName, fighterWins, fighterLosses, fighterImages, fighterHp, fighterMp, fighterAttack, fighterSpeed, fighterAccuracy, fighterLuck];
        newFighter.push(fighters);
      }
    }
  }
  xhr.open("GET", "/fighters.xml");
  xhr.send();
  return fighters;
};

$(document).ready(function(){
  // var allFighters = GetFighters();
  // console.log(allFighters);
  // for (var i = 0; i < allFighters.length; i++) {
  //   console.log(allFighters[i]);
  // }
  if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    xhr = new XMLHttpRequest();
  }
  xhr.overrideMimeType('text/xml');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var xml = xhr.responseXML;
      var getFighters = xml.documentElement.getElementsByTagName("fighter");

      for (var i = 0; i < getFighters.length; i++) {
        var fighterName = getFighters[i].getAttribute("name");
        var fighterWins = getFighters[i].getAttribute("wins");
        var fighterLosses = getFighters[i].getAttribute("losses");
        var fighterImages = getFighters[i].getAttribute("image");
        var fighterHp = getFighters[i].getAttribute("hp");
        var fighterMp = getFighters[i].getAttribute("mp");
        var fighterAttack = getFighters[i].getAttribute("attack");
        var fighterSpeed = getFighters[i].getAttribute("speed");
        var fighterAccuracy = getFighters[i].getAttribute("accuracy");
        var fighterLuck = getFighters[i].getAttribute("luck");
        var newFighter = [fighterName, fighterWins, fighterLosses, fighterImages, fighterHp, fighterMp, fighterAttack, fighterSpeed, fighterAccuracy, fighterLuck];
        console.log(fighterName);
      }
    }
  }
  xhr.open("GET", "/fighters.xml");
  xhr.send();
});
