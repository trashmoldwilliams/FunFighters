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

        $("#burn").click(function(){
          if(player1.mp >= 5) {
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
  this.name = name;
  this.id = id;
  this.hp = (40 * hp) + 100;
  this.maxHp = this.hp;
  this.mp = mp;
  this.maxMp = mp;
  this.attack = (23 + (2 * attack));
  this.speed = (10 * speed);
  this.accuracy =(10 * accuracy);
  this.luck = (10 * luck);
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
  }
  else {
    executeFrost(User, Opponent);
  }

  this.moveDocket.splice(0, 1);
};

var executePunch = function(User, Target, Punch) {
  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (Punch.accuracy + User.accuracy - (Target.speed *0.5))) {
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

  if(randomNumber <= (80 + User.accuracy - (Target.speed * 0.5) )) {
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
  User.mp -= 5;

  randomNumber =Math.floor((Math.random() * 100) + 1);

  if(randomNumber <= (80 + User.accuracy - (Target.speed * 0.5) )) {
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

  if(randomNumber <= (80 + User.accuracy - (Target.speed *0.5))) {
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

  // if(player.burn == 0 && AI.mp >= 6) {
  //   console.log(burn);
  //   return burn;
  // } else if ((AI.accuracy - (player.speed *0.5) ) < -20 && AI.mp >= 2) {
  //   console.log(lockon);
  //   return lockon;
  // } else if (player.hp <= (AI.attack * 0.5) && AI.burn == 0) {
  //   console.log(jab);
  //   return jab;
  // } else if (player.burn > 0 && AI.hp >= (AI.hp * 0.15) && AI.speed > (player.speed *0.5) ) {
  //   console.log(block);
  //   return block;
  // } else if (AI.speed > player.accuracy && AI.speed > player.speed && player.accuracy - AI.speed > -50) {
  //   console.log(blind);
  //   return blind;
  // } else if (AI.accuracy - player.speed > 25) {
  //   console.log(uppercut);
  //   return uppercut;
  // } else {
  //   console.log(hook);
  //   return hook;
  // }
  if((AI.mp >= 5) && ((((AI.accuracy - (player.speed *0.5) ) + 80)>50)))
  {
    console.log(burn);
    return burn;
  }
  else if (((AI.accuracy - (player.speed *0.5) ) < 30) && (AI.mp >= 2))
  {
    console.log(lockon);
    return lockon;
  }
  else if (((player.speed)  > 50) && (AI.mp >= 3))
  {
    console.log(frost);
    return frost;
  }
  else if ((((AI.accuracy -(player.speed *0.5) ) + 100) <= 10) &&(AI.mp < 2))
  {
    console.log(jab);
    return jab;
  }
  else if ((AI.hp >= (player.hp * 2)) && ((AI.accuracy - (player.speed *0.5) ) > 50))
  {
    console.log(hook);
    return hook;
  }
  else if ((player.hp <= player.GetBurn) && (AI.speed < (player.speed *0.5) ))
  {
    console.log(block);
    return block;
  }
  else if ((AI.mp >= 1) && ((player.accuracy - AI.speed) >60) )
  {
    console.log(blind);
    return blind;
  }
  else if (((AI.accuracy - (player.speed *0.5) ) + 30) >=100)
  {
    console.log(uppercut);
    return uppercut;
  }
  else if ((AI.luck >= 50) && (AI.mp >= 5) && ((((AI.accuracy - (player.speed *0.5) ) + 80)>30)))
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
  else if (((AI.hp * 0.5) < AI.maxHp) && (player.hp > AI.hp) && ((AI.accuracy - (player.speed *0.5)  + 65) > 40))
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
    return hook;
  }
}

Battle.prototype.checkDead = function () {
  if(this.leftFighter.hp <= 0) {
    $("#winner").html(this.rightFighter.name);
    var posting = $.post( "/UpdateFighters", { player2:this.rightFighter.id, player2Wins:this.rightFighter.wins+1, player2Losses:this.rightFighter.losses, player1:this.leftFighter.id, player1Wins:this.leftFighter.wins, player1Losses:this.leftFighter.losses+1 } );
    posting.done(function( data ) {
      $("#fightUI").hide();
      $("#endFightMenu").fadeIn();
    });
  } else if (this.rightFighter.hp <= 0) {
    $("#winner").html(this.leftFighter.name);
    var posting = $.post( "/UpdateFighters", { player2:this.rightFighter.id, player2Wins:this.rightFighter.wins, player2Losses:this.rightFighter.losses+1, player1:this.leftFighter.id, player1Wins:this.leftFighter.wins+1, player1Losses:this.leftFighter.losses } );
    posting.done(function( data ) {
      console.log(data);
      $("#fightUI").hide();
      $("#endFightMenu").fadeIn();
    });
  }
};

Battle.prototype.burnFighters = function () {
  if(this.leftFighter.burn > 0) {
    this.leftFighter.hp -= this.leftFighter.burn;
    if(this.leftFighter.hp < 0) {
      this.leftFighter.hp = 0;
    }
  }

  if(this.rightFighter.burn > 0) {
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
