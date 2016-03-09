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
        var player1 = $( data ).find( "#player1" );
        var player2 = $( data ).find( "#player2" );
        console.log(data);
        $("#player1Name").html(player1.attr("name").toUpperCase());
        $("#player2Name").html(player2.attr("name").toUpperCase());
        $("#player1Image").attr("src",player1.attr("image"));
        $("#player2Image").attr("src",player2.attr("image"));
        player1 = new Fighter(parseInt(player1.attr("healthpoints")),parseInt(player1.attr("magicpoints")),parseInt(player1.attr("attack")),parseInt(player1.attr("speed")),parseInt(player1.attr("accuracy")),parseInt(player1.attr("luck")),1);
        player2 = new Fighter(parseInt(player2.attr("healthpoints")),parseInt(player2.attr("magicpoints")),parseInt(player2.attr("attack")),parseInt(player2.attr("speed")),parseInt(player2.attr("accuracy")),parseInt(player2.attr("luck")),2);
        //draw player status
        player1.draw();
        player2.draw();
        battle = new Battle (player1, player2);
        $("#jab").click(function(){
          battle.AddMoves(jab, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#hook").click(function(){
          battle.AddMoves(hook, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#uppercut").click(function(){
          battle.AddMoves(uppercut, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#block").click(function(){
          battle.AddMoves(block, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#blind").click(function(){
          battle.AddMoves(blind, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#lockon").click(function(){
          battle.AddMoves(lockon, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#burn").click(function(){
          battle.AddMoves(burn, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });

        $("#frost").click(function(){
          battle.AddMoves(frost, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          player1.draw();
          player2.draw();
        });
      });


    });
});

var player1 = null;
var player2 = null;
var battle = null;

var Fighter = function(hp,mp,attack,speed,accuracy,luck,player){
  this.hp = (40 * hp) + 140;
  this.maxHp = this.hp;
  this.mp = mp;
  this.maxMp = mp;
  this.attack = (25 + (2 * attack));
  this.speed = (10 * speed);
  this.accuracy =(10 * accuracy);
  this.luck = (10 * luck);
  this.defense = 1;
  this.burn = 0;
  this.player = player;
}

Fighter.prototype.draw = function () {
  if(this.player === 1){
    $("#player1HpCurrent").html(this.hp);
    $("#player1HpMax").html(this.maxHp);
    $("#player1MpCurrent").html(this.mp);
    $("#player1MpMax").html(this.maxMp);
    $("#player1Attack").html(this.attack);
    $("#player1Speed").html(this.speed);
    $("#player1Accuracy").html(this.accuracy);
    $("#player1Luck").html(this.luck);
  } else {
    $("#player2HpCurrent").html(this.hp);
    $("#player2HpMax").html(this.maxHp);
    $("#player2MpCurrent").html(this.mp);
    $("#player2MpMax").html(this.maxMp);
    $("#player2Attack").html(this.attack);
    $("#player2Speed").html(this.speed);
    $("#player2Accuracy").html(this.accuracy);
    $("#player2Luck").html(this.luck);
  }

};

var Battle = function(leftFighter,rightFighter){
  this.leftFighter = leftFighter;
  this.rightFighter = rightFighter;
  this.moveDocket = [];
  this.isFirst = null;
  this.isSecond = null;

}

var Move = function(id, method, punchType) {
  this.id = id;
  this.method = method;
  this.punchType = punchType;
}

var Punch = function(multiplier, accuracy) {
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
var frost = new Move(8, "executeFrost", "N/A");


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
    executePunch(User, Opponent, move.punchType);
  } else if (move.method === "executeBlock"){
    executeBlock(User);
  } else if (move.method === "executeBlind"){
    executeBlind(User, Opponent);
  } else if (move.method === "executeLockon"){
    executeLockon(User);
  } else if (move.method === "executeBurn"){
    executeBurn(User, Opponent);
  } else {
    executeFrost(User, Opponent);
  }

  this.moveDocket.splice(0, 1);
};

var executePunch = function(User, Target, Punch) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (Punch.accuracy + User.accuracy - Target.speed)) {
    var damage = 0;

    if(randomNumber <= User.luck) {
      damage = Math.floor(2 * (User.attack * Punch.multiplier));
    } else {
      damage = Math.floor(User.attack * Punch.multiplier);
    }
    Target.hp -= Math.floor(damage * Target.defense);
    if(Target.hp < 0) {
      Target.hp = 0;
    }
    return Math.floor(damage * Target.defense);

  } else {
    return "miss";
  }
}

var executeBlock = function(User) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= User.luck) {
    User.defense = 0.1;
  } else {
    User.defense = 0.65;
  }
}

var executeBlind = function(User, Target) {
  User.mp -= 1;

  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (80 + User.accuracy - Target.speed)) {
    var output = 0;

    if(randomNumber <= User.luck) {
      output = Math.floor(Target.accuracy * 0.2);
      Target.accuracy = Math.floor(Target.accuracy * 0.8);
      return output;
    } else {
      output = Math.floor(Target.accuracy * 0.1);
      Target.accuracy = Math.floor(Target.accuracy * 0.9);
      return output;
    }
  } else {
    return "miss";
  }
}

var executeLockon = function(User) {
  User.mp -= 2;

  randomNumber =Math.floor((Math.random() * 100) + 1);
  var output = [];
  var output1 = 0;
  var output2 = 0;

  if(randomNumber <= User.luck) {
    output1 = Math.floor(User.accuracy * 0.4);
    User.accuracy = Math.floor(User.accuracy * 0.4);
    output.push(output1);
    output2 = Math.floor(User.luck * 0.4);
    User.luck = Math.floor(User.luck * 0.4);
    output.push(output2);
    return output;

  } else {
    output1 = Math.floor(User.accuracy * 0.2);
    User.accuracy = Math.floor(User.accuracy * 0.2);
    output.push(output1);
    output2 = Math.floor(User.luck * 0.2);
    User.luck = Math.floor(User.luck * 0.2);
    output.push(output2);
    return output;
  }
}

var executeBurn = function(User, Target) {
  User.mp -= 5;

  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (80 + User.accuracy - Target.speed)) {
    var output = 0;

    if(randomNumber <= User.luck) {
      output = Math.floor(Target.attack * 0.3);
      Target.attack = Math.floor(Target.attack * 0.7);
      Target.burn += 30;
      return output;
    } else {
      output = Math.floor(Target.attack * 0.6);
      Target.attack = Math.floor(Target.attack * 0.4);
      Target.burn += 15;
      return output;
    }
  } else {
    return "miss";
  }
}

var executeFrost = function(User, Target) {
  User.mp -= 3;

  randomNumber =Math.floor((Math.random() * 100) + 1);
  var output = [];
  var output1 = 0;
  var output2 = 0;

  if(randomNumber <= (80 + User.accuracy - Target.speed)) {
    if(randomNumber <= User.luck) {
      output1 = Math.floor(Target.hp * 0.2);
      Target.hp = Math.floor(Target.hp * 0.8);
      output.push(output1);
      output2 = Math.floor(Target.speed * 0.4);
      Target.speed = Math.floor(Target.speed * 0.6);
      output.push(output2);
      return output;

    } else {
      output1 = Math.floor(Target.hp * 0.1);
      Target.hp = Math.floor(Target.hp * 0.9);
      output.push(output1);
      output2 = Math.floor(Target.speed * 0.2);
      Target.speed = Math.floor(Target.speed * 0.8);
      output.push(output2);
      return output;
    }
  } else {
    return "miss";
  }
}

Battle.prototype.AI = function() {
  player = this.leftFighter;
  AI = this.rightFighter;

  if(player.burn == 0 && AI.mp >= 6) {
    return burn;
  } else if ((AI.accuracy - player.speed) < -20 && AI.mp >= 2) {
    return lockon;
  } else if (player.hp <= (AI.attack * 0.5) && AI.burn == 0) {
    return jab;
  } else if (player.burn > 0 && AI.hp >= (AI.hp * 0.15) && AI.speed > player.speed) {
    return block;
  } else if (AI.speed > player.accuracy && AI.speed > player.speed && player.accuracy - AI.speed > -50) {
    return blind;
  } else if (AI.accuracy - player.speed > 25) {
    return uppercut;
  } else {
    return hook;
  }
}

var newFighterChecker = function(){
  var player1 = $("#player1").val();
  var player2 = $("#player2").val();
  if(player1 != "default" && player2 != "default" && player1 != player2){
    $("#submitFightButton").prop('disabled',false);
  } else {
    $("#submitFightButton").prop('disabled',true);
  }
}
