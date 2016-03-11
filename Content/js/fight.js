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
        player1 = new Fighter(player1.attr("name"),parseInt(player1.attr("fighterId")), parseInt(player1.attr("healthpoints")),parseInt(player1.attr("magicpoints")),parseInt(player1.attr("attack")),parseInt(player1.attr("speed")),parseInt(player1.attr("accuracy")),parseInt(player1.attr("luck")),1, player1.attr("wins"), player1.attr("losses"));
        player2 = new Fighter(player2.attr("name"),parseInt(player2.attr("fighterId")), parseInt(player2.attr("healthpoints")),parseInt(player2.attr("magicpoints")),parseInt(player2.attr("attack")),parseInt(player2.attr("speed")),parseInt(player2.attr("accuracy")),parseInt(player2.attr("luck")),2, player2.attr("wins"), player2.attr("losses"));
        //draw player status
        player1.draw();
        player2.draw();
        battle = new Battle (player1, player2);
        $("#jab").click(function(){
          battle.AddMoves(jab, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          battle.revertBlock();
          battle.burnFighters();
          player1.draw();
          player2.draw();
          battle.checkDead();
        });

        $("#hook").click(function(){
          battle.AddMoves(hook, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          battle.revertBlock();
          battle.burnFighters();
          player1.draw();
          player2.draw()
          battle.checkDead();
        });

        $("#uppercut").click(function(){
          battle.AddMoves(uppercut, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          battle.revertBlock();
          battle.burnFighters();
          player1.draw();
          player2.draw()
          battle.checkDead();
        });

        $("#block").click(function(){
          battle.AddMoves(block, battle.AI());
          battle.ExecuteMove(battle.isFirst, battle.isSecond);
          battle.ExecuteMove(battle.isSecond, battle.isFirst);
          battle.revertBlock();
          battle.burnFighters();
          player1.draw();
          player2.draw()
          battle.checkDead();
        });

        $("#blind").click(function(){
          if(player1.mp >= 1) {
            battle.AddMoves(blind, battle.AI());
            battle.ExecuteMove(battle.isFirst, battle.isSecond);
            battle.ExecuteMove(battle.isSecond, battle.isFirst);
            battle.revertBlock();
            battle.burnFighters();
            player1.draw();
            player2.draw();
            battle.checkDead();
          }
        });

        $("#lockon").click(function(){
          if(player1.mp >= 2) {
            battle.AddMoves(lockon, battle.AI());
            battle.ExecuteMove(battle.isFirst, battle.isSecond);
            battle.ExecuteMove(battle.isSecond, battle.isFirst);
            battle.revertBlock();
            battle.burnFighters();
            player1.draw();
            player2.draw();
            battle.checkDead();
          }
        });

        if(player1.maxMp < 10) {
          $("#burn").hide();
        }

        $("#burn").click(function(){
          if((player1.mp >= 6) && (player1.maxMp = 10)) {
            battle.AddMoves(burn, battle.AI());
            battle.ExecuteMove(battle.isFirst, battle.isSecond);
            battle.ExecuteMove(battle.isSecond, battle.isFirst);
            battle.revertBlock();
            battle.burnFighters();
            player1.draw();
            player2.draw();
            battle.checkDead();
          }
        });

        $("#frost").click(function(){
          if(player1.mp >= 3) {
            battle.AddMoves(frost, battle.AI());
            battle.ExecuteMove(battle.isFirst, battle.isSecond);
            battle.ExecuteMove(battle.isSecond, battle.isFirst);
            battle.revertBlock();
            battle.burnFighters();
            player1.draw();
            player2.draw();
            battle.checkDead();
          }
        });
      });
    });
});

var player1 = null;
var player2 = null;
var battle = null;

var Fighter = function(name,id,hp,mp,attack,speed,accuracy,luck,player,wins,losses){
  this.name = name.toUpperCase();
  this.id = id;
  this.hp = (20 * hp) + 120;
  this.maxHp = this.hp;
  this.mp = mp;
  this.maxMp = mp;
  this.attack = (23 + (2 * attack));
  this.speed = (10 * speed);
  this.accuracy =(10 * accuracy);
  this.luck = ((10 * luck) * 0.9);
  this.defense = 1;
  this.burn = 0;
  this.player = player;
  this.wins = wins;
  this.losses = losses;
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

var Punch = function(name, multiplier, accuracy) {
  this.name = name;
  this.multiplier = multiplier;
  this.accuracy = accuracy;
}

var jabPunch = new Punch("JAB", 0.5, 100);
var hookPunch = new Punch("HOOK", 1, 50);
var uppercutPunch = new Punch("UPPERCUT", 1.5, 20);

var jab = new Move(1, "executePunch", jabPunch);
var hook = new Move(2, "executePunch", hookPunch);
var uppercut = new Move(3, "executePunch", uppercutPunch);
var block = new Move(4, "executeBlock", "N/A");
var blind = new Move(5, "executeBlind", "N/A");
var lockon = new Move(6, "executeLockon", "N/A");
var burn = new Move(7, "executeBurn", "N/A");
var frost = new Move(8, "executeFrost", "N/A");


Battle.prototype.AddMoves = function (LeftMove, RightMove) {
  $("#gameLogList").html("");
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(LeftMove.id === 4) {
    this.isFirst = this.leftFighter;
    this.isSecond = this.rightFighter;
    this.moveDocket.push(LeftMove);
    this.moveDocket.push(RightMove);
  } else if(RightMove.id === 4) {
    this.isFirst = this.rightFighter;
    this.isSecond = this.leftFighter;
    this.moveDocket.push(RightMove);
    this.moveDocket.push(LeftMove);
  } else if(this.leftFighter.speed >= this.rightFighter.speed) {
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
    $("#gameLogList").append("<li>" + User.name + " used " + move.punchType.name + ",</li>");
    var output = executePunch(User, Opponent, move.punchType);
    if(output === 0) {
      $("#gameLogList").append("<li>" + User.name + " missed!</li>");
    } else {
      $("#gameLogList").append("<li>" + Opponent.name + " took " + output + " damage!</li>");
    }
  } else if (move.method === "executeBlind"){
    $("#gameLogList").append("<li>" + User.name + " used BLIND,</li>");
    var output = executeBlind(User, Opponent);
    if(output === 0) {
      $("#gameLogList").append("<li>" + User.name + " missed!</li>");
    } else {
      $("#gameLogList").append("<li>" + Opponent.name + " lost " + output + " accuracy!</li>");
    }
  } else if (move.method === "executeLockon"){
    $("#gameLogList").append("<li>" + User.name + " used LOCKON,</li>");
    var output = executeLockon(User);
    $("#gameLogList").append("<li>" + User.name + " gained " + output[0] + " accuracy!</li>");
    $("#gameLogList").append("<li>" + User.name + " gained " + output[1] + " luck!</li>");
  }
  else if (move.method === "executeBurn"){
    $("#gameLogList").append("<li>" + User.name + " used BURN,</li>");
    var output = executeBurn(User, Opponent);
    if(output === 0) {
      $("#gameLogList").append("<li>" + User.name + " missed!</li>");
    } else {
      $("#gameLogList").append("<li>" + Opponent.name + " caught on FIRE!!</li>");
      $("#gameLogList").append("<li>" + Opponent.name + " lost " + output + " attack!</li>");
    }
  } else if (move.method === "executeFrost"){
    $("#gameLogList").append("<li>" + User.name + " used FROST,</li>");
    var output = executeFrost(User, Opponent);
    if(output === 0) {
      $("#gameLogList").append("<li>" + User.name + " missed!</li>");
    } else {
      $("#gameLogList").append("<li>" + Opponent.name + " took " + output[0] + " damage!</li>");
      $("#gameLogList").append("<li>" + Opponent.name + " lost " + output[1] + " speed!</li>");
    }
  } else {
    $("#gameLogList").append("<li>" + User.name + " used BLOCK!</li>");
    executeBlock(User);
  }

  this.moveDocket.splice(0, 1);
};

var executePunch = function(User, Target, Punch) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (Punch.accuracy + User.accuracy - (Target.speed *0.6))) {
    var damage = 0;

    if(randomNumber <= User.luck) {
      $("#gameLogList").append('<li class="critical">CRITICAL!</li>');
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
    return 0;
  }
}

var executeBlock = function(User) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= User.luck) {
    $("#gameLogList").append('<li class="critical">CRITICAL!</li>');
    User.defense = 0.35;
  } else {
    User.defense = 0.65;
  }
}

var executeBlind = function(User, Target) {
  User.mp -= 1;

  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (80 + User.accuracy - (Target.speed * 0.6) )) {
    var output = 0;

    if(randomNumber <= User.luck) {
      $("#gameLogList").append('<li class="critical">CRITICAL!</li>');
      output = Math.floor(Target.accuracy * 0.2);
      Target.accuracy = Math.floor(Target.accuracy * 0.8);
      return output;
    } else {
      output = Math.floor(Target.accuracy * 0.1);
      Target.accuracy = Math.floor(Target.accuracy * 0.9);
      return output;
    }
  } else {
    return 0;
  }
}

var executeLockon = function(User) {
  User.mp -= 2;

  randomNumber =Math.floor((Math.random() * 100) + 1);
  var output = [];
  var output1 = 0;
  var output2 = 0;

  if(randomNumber <= User.luck) {
    $("#gameLogList").append('<li class="critical">CRITICAL!</li>');
    output1 = Math.floor(User.accuracy * 0.4);
    User.accuracy = Math.floor(User.accuracy * 1.4);
    output.push(output1);
    output2 = Math.floor(User.luck * 0.4);
    User.luck = Math.floor(User.luck * 1.4);
    output.push(output2);
    return output;

  } else {
    output1 = Math.floor(User.accuracy * 0.2);
    User.accuracy = Math.floor(User.accuracy * 1.2);
    output.push(output1);
    output2 = Math.floor(User.luck * 0.2);
    User.luck = Math.floor(User.luck * 1.2);
    output.push(output2);
    return output;
  }
}

var executeBurn = function(User, Target) {
  User.mp -= 6;

  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (80 + User.accuracy - (Target.speed * 0.6) )) {
    var output = 0;

      output = Math.floor(Target.attack * 0.2);
      Target.attack = Math.floor(Target.attack * 0.8);
      Target.burn += (Target.maxHp * 0.1);
      return output;
    }
    else {
    return 0;
  }
}

var executeFrost = function(User, Target) {
  User.mp -= 3;

  randomNumber =Math.floor((Math.random() * 100) + 1);
  var output = [];
  var output1 = 0;
  var output2 = 0;

  if(randomNumber <= (80 + User.accuracy - (Target.speed *0.6))) {
    if(randomNumber <= User.luck) {
      $("#gameLogList").append('<li class="critical">CRITICAL!</li>');
      output1 = Math.floor(Target.hp * 0.3);
      Target.hp = Math.floor(Target.hp * 0.7);
      output.push(output1);
      output2 = Math.floor(Target.speed * 0.4);
      Target.speed = Math.floor(Target.speed * 0.6);
      output.push(output2);
      return output;

    } else {
      output1 = Math.floor(Target.hp * 0.2);
      Target.hp = Math.floor(Target.hp * 0.8);
      output.push(output1);
      output2 = Math.floor(Target.speed * 0.2);
      Target.speed = Math.floor(Target.speed * 0.8);
      output.push(output2);
      return output;
    }
  } else {
    return 0;
  }
}

Battle.prototype.AI = function() {
  player = this.leftFighter;
  AI = this.rightFighter;

  if((AI.mp >= 6) && (AI.maxMp === 10) && ((((AI.accuracy - (player.speed *0.5) ) + 80)>50)))
  {
    console.log(burn);
    return burn;
  }
  else if ((((player.speed)  > 30) || (player.maxHp > 350)) && (AI.mp >= 3))
  {
    console.log(frost);
    return frost;
  }
  else if (((AI.accuracy - (player.speed *0.5) ) < 50) && (AI.mp >= 2) && (AI.maxMp < 7))
  {
    console.log(lockon);
    return lockon;
  }
  else if ((((player.maxHp * 0.25 >= player.hp) && (AI.accuracy -(player.speed *0.5) ) <= 25) &&(AI.mp < 2)))
  {
    console.log(jab);
    return jab;
  }
  else if ((AI.mp >= 1) && (player.accuracy >= 70) && (AI.luck < 50))
  {
    console.log(blind);
    return blind;
  }
  else if ((AI.hp >= (player.hp * 2)) && ((AI.accuracy - (player.speed *0.5) > 40)))
  {
    console.log(hook);
    return hook;
  }
  else if (((AI.hp <=(AI.maxHp * 0.7) && (player.burn != 0))))
  {
    console.log(block);
    return block;
  }
  else if (((AI.accuracy - (player.speed *0.5) ) + 30) >=80)
  {
    console.log(uppercut);
    return uppercut;
  }
  else if ((AI.luck >= 50) && (AI.mp >= 5) && (AI.maxMp === 10) && ((((AI.accuracy - (player.speed *0.5) ) + 80)>30)))
  {
    console.log(burn);
    return burn;
  }
  else if (((AI.accuracy - (player.speed * 0.5) ) + 30) >=100)
  {
    console.log(uppercut);
    return uppercut;
  }
  else if ((AI.hp >= (player.hp * 2)) && ((AI.accuracy - (player.speed *0.5) ) < 50))
  {
    console.log(jab);
    return jab;
  }
  else if ((AI.hp < player.attack) && (((player.accuracy - AI.speed +100) > 30)))
  {
    console.log(uppercut);
    return uppercut;
  }
  else if (((AI.hp * 0.5) < AI.maxHp) && (player.hp > AI.hp) && ((AI.accuracy - (player.speed *0.5)  + 50) > 40))
  {
    console.log(hook);
    return hook;
  }
  else if ((AI.hp <= (AI.maxHp * 0.25) && AI.luck >= 40 && (player.hp >= (player.maxHp * 0.5))))
  {
    console.log(uppercut);
    return uppercut;
  }
  else
  {
    console.log(hook);
    return jab;
  }
}

Battle.prototype.checkDead = function () {
  if(this.leftFighter.hp <= 0 && this.rightFighter.hp <= 0) {
    $("#moveSelector").removeAttr('id');

    if(this.rightFighter.speed > this.leftFighter.speed) {
      $("#winner").html(this.rightFighter.name);
      var posting = $.post( "/UpdateFighters", { player2:this.rightFighter.id, player2Wins:parseInt(this.rightFighter.wins)+1, player2Losses:parseInt(this.rightFighter.losses), player1:this.leftFighter.id, player1Wins:parseInt(this.leftFighter.wins), player1Losses:parseInt(this.leftFighter.losses)+1 } );
      posting.done(function( data ) {
        $("#fightUI").hide();
        $("#endFightMenu").fadeIn();
      });
    }
    else if(this.leftFighter.speed > this.rightFighter.speed) {
        $("#winner").html(this.leftFighter.name);
        var posting = $.post( "/UpdateFighters", { player2:this.leftFighter.id, player2Wins:parseInt(this.leftFighter.wins)+1, player2Losses:parseInt(this.leftFighter.losses), player1:this.rightFighter.id, player1Wins:parseInt(this.rightFighter.wins), player1Losses:parseInt(this.rightFighter.losses)+1 } );
        posting.done(function( data ) {
          $("#fightUI").hide();
          $("#endFightMenu").fadeIn();
    });
  }
} else if(this.leftFighter.hp <= 0) {
    $("#moveSelector").removeAttr('id');
    $("#winner").html(this.rightFighter.name);
    var posting = $.post( "/UpdateFighters", { player2:this.rightFighter.id, player2Wins:parseInt(this.rightFighter.wins)+1, player2Losses:parseInt(this.rightFighter.losses), player1:this.leftFighter.id, player1Wins:parseInt(this.leftFighter.wins), player1Losses:parseInt(this.leftFighter.losses)+1 } );
    posting.done(function( data ) {
      $("#fightUI").hide();
      $("#endFightMenu").fadeIn();
    });
  } else if (this.rightFighter.hp <= 0) {
    $("#moveSelector").removeAttr('id');
    $("#winner").html(this.leftFighter.name);
    var posting = $.post( "/UpdateFighters", { player2:this.rightFighter.id, player2Wins:this.rightFighter.wins, player2Losses:parseInt(this.rightFighter.losses+1), player1:this.leftFighter.id, player1Wins:parseInt(this.leftFighter.wins)+1, player1Losses:parseInt(this.leftFighter.losses) } );
    posting.done(function( data ) {
      console.log(data);
      $("#fightUI").hide();
      $("#endFightMenu").fadeIn();
    });
  }
};

Battle.prototype.burnFighters = function () {
  if(this.leftFighter.burn > 0) {
    $("#gameLogList").append("<li>" + this.leftFighter.name + " took " + this.leftFighter.burn + " damage from burning!</li>");
    this.leftFighter.hp -= this.leftFighter.burn;
    if(this.leftFighter.hp < 0) {
      this.leftFighter.hp = 0;
    }
  }

  if(this.rightFighter.burn > 0) {
    $("#gameLogList").append("<li>" + this.rightFighter.name + " took " + this.rightFighter.burn + " damage from burning!</li>");
    this.rightFighter.hp -= this.rightFighter.burn;
    if(this.rightFighter.hp < 0) {
      this.rightFighter.hp = 0;
    }
  }
};

Battle.prototype.revertBlock = function () {
  this.leftFighter.defense = 1;
  this.rightFighter.defense = 1;
};

var newFighterChecker = function(){
  var player1 = $("#player1").val();
  var player2 = $("#player2").val();
  if(player1 != "default" && player2 != "default" && player1 != player2){
    $("#submitFightButton").prop('disabled',false);
  } else {
    $("#submitFightButton").prop('disabled',true);
  }
}
