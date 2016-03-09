$(document).ready (function(){
  newFighterChecker();
    $("#player1").change(function(){
      newFighterChecker();
    });
    $("#player2").change(function(){
      newFighterChecker();
    });
    $("#submitFightButton").click(function(){
      $("#chooseFighterMenu").hide();
      $("#fightUI").fadeIn();
      var player1 = $("#player1").val();
      var player2 = $("#player2").val();
      var posting = $.post( "/GetFighters", { player1:player1, player2:player2 } );
      posting.done(function( data ) {
        console.log(data);
        var player1 = $( data ).find( "#player1" );
        var player2 = $( data ).find( "#player2" );
        $("#player1Name").html(player1.attr("name").toUpperCase());
        $("#player2Name").html(player2.attr("name").toUpperCase());
        $("#player1Image").attr("src",player1.attr("image"));
        $("#player2Image").attr("src",player2.attr("image"));
      });
    });
});

var Fighter = function(hp,mp,attack,speed,accuracy,luck,total,levelLimit){
  this.hp = hp;
  this.maxHp = hp;
  this.mp = mp;
  this.maxMp = mp;
  this.attack = attack;
  this.speed =speed;
  this.accuracy =accuracy;
  this.luck = luck;

  this.defense = 1;
  this.burn = 0;
}

var Move(id, method, punchType) {
  this.id = id;
  this.method = method;
  this.punchType = punchType;
}

var Punch(multiplier, accuracy) {
  this.multiplier = multiplier;
  this.accuracy = accuracy;
}

var jabPunch = new Punch(0.5, 100);
var hookPunch = new Punch(1, 65);
var uppercutPunch = new Punch(2, 30);

var jab = new Move(1, "executePunch", jabPunch);
var hook = new Move(2, "executePunch", hookPunch);
var uppercut = new Move(3, "executePunch", uppercutPunch);
var block = new Move(4, "executeBlock", "N/A");
var blind = new Move(5, "executeBlind", "N/A");
var lockon = new Move(6, "executeLockon", "N/A");
var burn = new Move(7, "executeBurn", "N/A");

var Battle = function(leftFighter,rightFighter){
  this.leftFighter = leftFighter;
  this.rightFighter = rightFighter;
  this.moveDocket = [];
  this.isFirst = null;
  this.isSecond = null;

}

Battle.prototype.AddMoves = function (LeftMove, RightMove) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(this.leftFighter.speed >= this.rightFighter.speed) {
    this.isFirst = this.leftFighter;
    this.isSecond = this.rightFighter;
    this.moveDocket.push(LeftMove);
    this.moveDocket.push(RightMove);
  } else if(this.rightFighter.speed >= this.leftFighter.speed) {
    this.isFirst = this.rightFighter;
    this.isSecond = this.leftFighter;
    this.moveDocket.push(RightMove);
    this.moveDocket.push(LeftMove);
  } else if (randomNumber <= 50) {
    this.isFirst = this.leftFighter;
    this.isSecond = this.rightFighter;
    this.moveDocket.push(LeftMove);
    this.moveDocket.push(RightMove);
  } else {
    this.isFirst = this.rightFighter;
    this.isSecond = this.leftFighter;
    this.moveDocket.push(RightMove);
    this.moveDocket.push(LeftMove);
  }
};

Battle.prototype.ExecuteMove = function (User, Opponent) {
  var move = this.moveDocket[0];

  if(move.method === "executePunch") {
    this.executePunch(User, Opponent, move.punchType);
  } else if (move.method === "executeBlock"){
    this.executeBlock(User);
  } else if {move.method === "executeBlind"){
    this.executeBlind(User, Opponent);
  } else if (move.method === "executeLockon"){
    this.executeLockon(User);
  } else {
    this.executeBurn(User, Opponent);
  }

  this.moveDocket.splice(0, 1);
};

var executePunch = function(User, Target, Punch) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (Punch.accuracy + User.accuracy - Target.speed)) {
    var damage = 0;

    if(randomNumber <= User.luck) {
      damage = 2 * (User.attack * Punch.multiplier)
    } else {
      damage = User.attack * Punch.multiplier;
    }
    target.hp -= damage * target.defense;
    return damage * target.defense;

  } else {
    return "miss";
  }
}

var executeBlock = function(User)
{
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= User.luck) {
    user.defense = 0.1;
  } else {
    user.defense = 0.65;
  }
}

var executeBlind = function(User, Target)
{
  if(randomNumber <= (80 + User.accuracy - Target.speed)) {
    var output = 0;

    if(randomNumber <= User.luck) {
      output = Target.accuracy * 0.2;
      Target.accuracy = Target.accuracy * 0.8;
      return output;
    } else {
      output = Target.accuracy * 0.1;
      Target.accuracy = Target.accuracy * 0.9;
      return output;
    }
    target.hp -= damage * target.defense;
    return damage * target.defense;

  } else {
    return "miss";
  }
}

var

var newFighterChecker = function(){
  var player1 = $("#player1").val();
  var player2 = $("#player2").val();
  if(player1 != "default" && player2 != "default" && player1 != player2){
    $("#submitFightButton").prop('disabled',false);
  } else {
    $("#submitFightButton").prop('disabled',true);
  }
}
