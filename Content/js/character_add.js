var TotalPoints = function(hp,mp,attack,speed,accuracy,luck,total,levelLimit){
  this.hp = hp;
  this.mp = mp;
  this.attack = attack;
  this.speed =speed;
  this.accuracy =accuracy;
  this.luck = luck;
  this.total = total;
  this.levelLimit = levelLimit;
}
TotalPoints.prototype.hpIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.hp <=this.levelLimit)) {
   this.hp++;
  }
  $("#hp").html(this.hp);
  $("#input_hp").val(this.hp);
  $("#hpOutput").html((20 * this.hp) + 120);
  $("#maxHpOutput").html((20 * this.hp) + 120);
}
TotalPoints.prototype.hpDecrease = function(){
  this.hp--;
  if (this.hp <= 1){
     this.hp = 1
   }
  $("#hp").html(this.hp);
  $("#input_hp").val(this.hp);
  $("#hpOutput").html((20 * this.hp) + 120);
  $("#maxHpOutput").html((20 * this.hp) + 120);
}
TotalPoints.prototype.mpIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.mp <=this.levelLimit)) {
   this.mp++;
  }
  $("#mp").html(this.mp);
  $("#input_mp").val(this.mp);
  $("#mpOutput").html(this.mp);
  $("#maxMpOutput").html(this.mp);
}
TotalPoints.prototype.mpDecrease = function(){
  this.mp--;
  if (this.mp <= 1){
     this.mp = 1
   }
  $("#mp").html(this.mp);
  $("#input_mp").val(this.mp);
  $("#mpOutput").html(this.mp);
  $("#maxMpOutput").html(this.mp);
}
TotalPoints.prototype.attackIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.attack <=this.levelLimit)) {
   this.attack++;
  }
  $("#attack").html(this.attack);
  $("#input_attack").val(this.attack);
  $("#attackOutput").html(23 + (2 * this.attack));
}
TotalPoints.prototype.attackDecrease = function(){
  this.attack--;
  if (this.attack <= 1){
     this.attack = 1
   }
  $("#attack").html(this.attack);
  $("#input_attack").val(this.attack);
  $("#attackOutput").html(23 + (2 * this.attack));
}
TotalPoints.prototype.speedIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.speed <=this.levelLimit)) {
   this.speed++;
  }
  $("#speed").html(this.speed);
  $("#input_speed").val(this.speed);
  $("#speedOutput").html(10 * this.speed);
}
TotalPoints.prototype.speedDecrease = function(){
  this.speed--;
  if (this.speed <= 1){
     this.speed = 1
   }
  $("#speed").html(this.speed);
  $("#input_speed").val(this.speed);
  $("#speedOutput").html(10 * this.speed);
}
TotalPoints.prototype.accuracyIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.accuracy <=this.levelLimit)) {
   this.accuracy++;
  }
  $("#accuracy").html(this.accuracy);
  $("#input_accuracy").val(this.accuracy);
  $("#accuracyOutput").html(10 * this.accuracy);
}
TotalPoints.prototype.accuracyDecrease = function(){
  this.accuracy--;
  if (this.accuracy <= 1){
     this.accuracy = 1
   }
  $("#accuracy").html(this.accuracy);
  $("#input_accuracy").val(this.accuracy);
  $("#accuracyOutput").html(10 * this.accuracy);
}
TotalPoints.prototype.luckIncrease = function(){
  if (((this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck)<this.total) && (this.luck <=this.levelLimit)) {
   this.luck++;
  }
  $("#luck").html(this.luck);
  $("#input_luck").val(this.luck);
  $("#luckOutput").html((10 * this.luck) * 0.9);
}
TotalPoints.prototype.luckDecrease = function(){
  this.luck--;
  if (this.luck <= 1){
     this.luck = 1
   }
  $("#luck").html(this.luck);
  $("#input_luck").val(this.luck);
  $("#luckOutput").html((10 * this.luck) * 0.9);
}
TotalPoints.prototype.formChecker = function(){
  var namevar = $("#name").val();
  $("#pointsRemaining").html(this.total - (this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck));
  if(((this.total - (this.hp+this.mp+this.attack+this.speed+this.accuracy+this.luck))==0) && ( namevar != "" )){
    $("#submitButton").prop('disabled',false);
  } else {
    $("#submitButton").prop('disabled',true);
  }
}

$(document).ready (function(){
  var newTotalPoints = new TotalPoints(parseInt($("#input_hp").val()),parseInt($("#input_mp").val()),parseInt($("#input_attack").val()),parseInt($("#input_speed").val()),parseInt($("#input_accuracy").val()),parseInt($("#input_luck").val()),30,9);
  newTotalPoints.formChecker();

  $("#name").keyup(function(){
    newTotalPoints.formChecker();
  });
  $("#imageSelection").change(function(){
    var imageLocation = $("#imageSelection option:selected").attr("id");
    $("#headshot").html("<img src='"+imageLocation+"'/>");
  });
  $("#health_increase").click(function(){
    newTotalPoints.hpIncrease();
    newTotalPoints.formChecker();
  });
  $("#health_decrease").click(function(){
    newTotalPoints.hpDecrease();
    newTotalPoints.formChecker();
  });
  $("#magic_increase").click(function(){
    newTotalPoints.mpIncrease();
    newTotalPoints.formChecker();
  });
  $("#magic_decrease").click(function(){
    newTotalPoints.mpDecrease();
    newTotalPoints.formChecker();
  });
  $("#attack_increase").click(function(){
    newTotalPoints.attackIncrease();
    newTotalPoints.formChecker();
  });
  $("#attack_decrease").click(function(){
    newTotalPoints.attackDecrease();
    newTotalPoints.formChecker();
  });
  $("#speed_increase").click(function(){
    newTotalPoints.speedIncrease();
    newTotalPoints.formChecker();
  });
  $("#speed_decrease").click(function(){
    newTotalPoints.speedDecrease();
    newTotalPoints.formChecker();
  });
  $("#accuracy_increase").click(function(){
    newTotalPoints.accuracyIncrease();
    newTotalPoints.formChecker();
  });
  $("#accuracy_decrease").click(function(){
    newTotalPoints.accuracyDecrease();
    newTotalPoints.formChecker();
  });
  $("#luck_increase").click(function(){
    newTotalPoints.luckIncrease();
    newTotalPoints.formChecker();
  });
  $("#luck_decrease").click(function(){
    newTotalPoints.luckDecrease();
    newTotalPoints.formChecker();
  });
});
