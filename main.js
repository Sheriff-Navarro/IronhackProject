// ========BODY GRADIENT===========================================

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}
setInterval(updateGradient,10);

// ===================================================
var gameDiv = document.getElementById("game");
var gameRow = "<div class='container'>    <div class='container'><div class='row'><div class='col-xs-12 '><div class='col-xs-3 '><div id='tile1' class='eachCard col-centered'>#</div></div><div class='col-xs-3'> <div class='eachCard col-centered'> # </div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div>          </div>        </div>      </div>    </div>  </div>";

function createRow(){
$("#game").append(gameRow);
};

function IndCard(points, color){
  this.points = points;
  this.color = color;
};

function MemoryGame(){
  this.gameCards = [];
  this.selectedCards = [];
  this.selectedPoints = [];
  this.gamePoints = 0;
  this.selectedDivs = [];
  this.pairsMatched = 0;
  this.pairsNeeded = 0;
  this.round = 1;
  this.player1score = 0;
  this.player2score = 0;
  this.difficulty = "";
  this.blockMatchedDivs = [];
  this.tripFaceClicks = 0;

  // this.createNewCardSet();
  }
MemoryGame.prototype.createNewPair = function(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  var card1 = new IndCard(10, color);
  var card2 = new IndCard(10, color);
  this.gameCards.push(card1);
  this.gameCards.push(card2);
  }

  MemoryGame.prototype.shuffle = function() {
    var currentIndex = this.gameCards.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = this.gameCards[currentIndex];
      this.gameCards[currentIndex] = this.gameCards[randomIndex];
      this.gameCards[randomIndex] = temporaryValue;
    }
    return this.gameCards;
  }

  MemoryGame.prototype.unlockEasyRows = function(){
    $("#easyGame1").removeClass("invisible");
    $("#easyGame2").removeClass("invisible");
    $("#easyGame3").removeClass("invisible");
  };

MemoryGame.prototype.lockEasy = function () {
  $("#easyGame1").addClass("invisible");
  $("#easyGame2").addClass("invisible");
  $("#easyGame3").addClass("invisible");
};

  MemoryGame.prototype.unlockMediumRows = function(){
    this.unlockEasyRows();
    $("#mediumGame4").removeClass("invisible");
    $("#mediumGame5").removeClass("invisible");
  };

  MemoryGame.prototype.lockMedium = function () {
    this.lockEasy();
    $("#mediumGame4").addClass("invisible");
    $("#mediumGame5").addClass("invisible");
  };

  MemoryGame.prototype.unlockHardRows = function(){
    this.unlockEasyRows();
    this.unlockMediumRows();
    $("#hardGame6").removeClass("invisible");
  };


MemoryGame.prototype.lockHard = function () {
  this.lockEasy();
  this.lockMedium();
  $("#hardGame6").addClass("invisible");
};

MemoryGame.prototype.hideBrand = function () {
  $("#brand").remove();
};

MemoryGame.prototype.whichDifficulty = function(that){

  if ($(that).attr("id") === "easy"){
    // console.log("easy");
    this.unlockEasyRows();
    for (var i = 0; i < 6; i ++ ){
      this.createNewPair();
    }
    this.pairsNeeded = 6;
    this.difficulty = "easy";
    // console.log(this.gameCards)
    // console.log(this.difficulty);
  }
   else if ($(that).attr("id") === "medium"){
    // console.log("medium");
    this.unlockMediumRows();
  for (var i = 0; i < 10; i ++ ){
    this.createNewPair();
  }
  this.pairsNeeded = 10;
  this.difficulty = "medium";
  // console.log(this.difficulty);
} else if ($(that).attr("id")==="hard") {
    // console.log("hard");
    this.unlockHardRows();
  for (var i = 0; i < 12; i ++ ){
    this.createNewPair();
  }
  this.pairsNeeded = 12;
  this.difficulty = "hard";
  // console.log(this.gameCards)
  // console.log(this.difficulty);
}
$("#diff").remove();
$(".scoreCard").removeClass("invisible");

};
// ========SETS DIV COLOR TO COLOR OF ITEM IN INDEX====
MemoryGame.prototype.idToIndex = function(thy) {
  var thisId = $(thy).attr("id");
  // console.log(thisId);
  var array = thisId.split("tile");
  var index = array[1];
  var indexToNum = Number(index);
  $(thy).css("background", newGame.gameCards[indexToNum].color);
  this.selectedDivs.push($(thy));
  // console.log(this.selectedDivs);
};

MemoryGame.prototype.selectCards = function(thy) {
  var selectedId = $(thy).attr("id");
  var selectedIdArray = selectedId.split("tile");
  var selectedIndex = selectedIdArray[1];
  this.selectedCards.push(newGame.gameCards[selectedIndex]);
  // console.log(this.selectedCards);
  this.selectedPoints.push(newGame.gameCards[selectedIndex].points);
  // console.log(this.selectedPoints);
  // $(this.selectedDivs[0]).addClass("selected");
  // $(this.selectedDivs[1]).addClass("selected");

};

MemoryGame.prototype.reduce = function(a,b){
this.gamePoints = this.selectedPoints.reduce(function(a,b){
  return a + b;
}, this.gamePoints);
$(".actualScore").html(this.gamePoints);
this.pairsMatched = this.pairsMatched + 1;
// console.log(this.pairsMatched);
};

MemoryGame.prototype.subtractPoint = function () {
  this.selectedCards[0].points = this.selectedCards[0].points - 1 ;
  $(this.selectedDivs[0]).html(this.selectedCards[0].points);
  this.selectedCards[1].points = this.selectedCards[1].points - 1 ;
    $(this.selectedDivs[1]).html(this.selectedCards[1].points);
};
MemoryGame.prototype.clearTileColor = function () {
  // $(this.selectedDivs[0]).effect("shake");
  // $(this.selectedDivs[1]).effect("shake");
  $(this.selectedDivs[0]).css("background-color", "");
  $(this.selectedDivs[1]).css("background-color", "");
};

MemoryGame.prototype.resetArrays = function () {
  this.selectedCards = [];
  this.selectedPoints = [];
  this.selectedDivs = [];
};

MemoryGame.prototype.pointerOff = function (i) {
  $(this.selectedDivs[i]).addClass("blocked");
};

MemoryGame.prototype.pointerOn = function(i) {
  $(this.selectedDivs[i]).removeClass("blocked");
};

MemoryGame.prototype.pushScoreToPlayer = function () {
  if (this.round === 1) {
  this.player1score = this.gamePoints;
} else if (this.round === 2) {
  this.player2score = this.gamePoints;
}
};


MemoryGame.prototype.roundOneDone = function () {
  this.pairsMatched = 0;
  this.pushScoreToPlayer();
  this.round += 1;
  console.log(newGame.player1score);
  this.gamePoints = 0;
  $(".p1Score").html(this.player1score);
  $(".eachCard").css("background-color", "");
  $(".actualScore").html(newGame.gamePoints);
};



MemoryGame.prototype.removeAllTiles = function () {
  if(this.difficulty === "easy") {
    newGame.lockEasy()
  }
 else if (this.difficulty === "medium") {
    newGame.lockMedium();
    }
  else if (this.difficulty === "hard") {
    newGame.lockHard();
    }
  };

  MemoryGame.prototype.p1Score = function () {
    $(".p1").html("Player 1: " +newGame.player1score);
  };

  MemoryGame.prototype.p2Score = function () {
    $(".p2").html("Player 2: " + newGame.player2score);
  };

  MemoryGame.prototype.showRoundOverCard = function () {
    $("#roundOver").removeClass("invisible");
    $("#roundOver").addClass("animated rollIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $("#roundOver").removeClass("animated rollIn");
  });
  };

  MemoryGame.prototype.hideRoundOverCard = function () {
    $("#roundOver").addClass("invisible");
  };


  MemoryGame.prototype.round2Diff = function () {
    if (this.difficulty === "easy") {
      this.unlockEasyRows();
     for (var i = 0; i < 6; i ++) {
      this.createNewPair();
    } this.pairsNeeded = 6;
  } else if (this.difficulty === "medium") {
    this.unlockMediumRows();
    for (var i =0; i < 10; i ++){
    this.createNewPair();
  } this.pairsNeeded = 10;
} else if (this.difficulty === "hard") {
  this.unlockHardRows();
  for (var i=0; i < 12; i++){
  this.createNewPair();
} this.pairsNeeded = 12;
  };
  this.pointerOnAll();
}

MemoryGame.prototype.resetTileNum = function () {
  $(".eachCard").html("10");
};

MemoryGame.prototype.pointerOnAll = function () {
  $(".eachCard.col-centered.blocked").removeClass("blocked");
  };

  MemoryGame.prototype.pointerOffAll = function () {
    $(".eachCard.col-centered").addClass("blocked");
  };

MemoryGame.prototype.hideP2Turn = function () {
  $("#start2").addClass("invisible");
};
var newGame = "";



MemoryGame.prototype.showP1Score = function () {
  $("#timeCard").removeClass("invisible");
};

MemoryGame.prototype.evaluateScores = function () {
  if(newGame.player1score > newGame.player2score){
    $("#start2").css("border", "none");
    $("#start2").css("font-size", "40px");
    $("#start2").html("PLAYER 1 WHOOPED THAT ASS!!!");
    $("#replay").html('<span class="glyphicon glyphicon-repeat"></span>')
    $("#start2:hover").css("pointer-events", "none");
  } else if (newGame.player1score < newGame.player2score) {
    $("#start2").css("border", "none");
    $("#start2").css("font-size", "40px");
    $("#start2").html("PLAYER 2 WHOOPED THAT ASS!!!")
    $("#replay").html('<span class="glyphicon glyphicon-repeat"></span>')
    $("#start2:hover").css("pointer-events", "none");
  } else if (newGame.player1score === newGame.player2score) {
    $("#start2").css("border", "none");
    $("#start2").css("font-size", "40px");
    $("#start2").html("You mothableepers tied, play again");
    $("#replay").html('<span class="glyphicon glyphicon-repeat"></span>')
    $("#start2:hover").css("pointer-events", "none");
  }
};

MemoryGame.prototype.reloadPage = function () {
  //restart game by reloading page
  console.log("reload this mothableeper");
  location.reload();
};

MemoryGame.prototype.blockDivs = function () {
  for (var i = 0; i < newGame.blockMatchedDivs.length; i++) {
    $(this.blockMatchedDivs[i]).addClass("blocked");
  }
};

MemoryGame.prototype.pushMatchedDivs = function (i) {
  this.blockMatchedDivs.push(this.selectedDivs[0]);
  this.blockMatchedDivs.push(this.selectedDivs[1]);
};


MemoryGame.prototype.noThirdClicks = function () {
  newGame.pointerOffAll();
setTimeout(function(){
  newGame.pointerOnAll();
  newGame.blockDivs();
},1000);
};

MemoryGame.prototype.bounceScore = function () {
console.log("bounceScores")
  $("#points").addClass("animated bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated bounce");
});
$(this.selectedDivs[0]).addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(this).removeClass("animated flash");
})
$(this.selectedDivs[1]).addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(this).removeClass("animated flash");
})
};

MemoryGame.prototype.shakeTile = function () {
  $(this.selectedDivs[0]).addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated shake");
  })
  $(this.selectedDivs[1]).addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated shake");
  })
};

// MemoryGame.prototype.whichDiffAnimation = function () {
//   if(newGame.difficulty==="easy"){
//     $("#easy").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//       $(this).removeClass("animated flash");
//     });
//   } else if (newGame.difficulty==="medium") {
//     $("#medium").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//       $(this).removeClass("animated flash");
//     });
//   } else if (newGame.difficulty==="hard") {
//     $("#hard").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//       $(this).removeClass("animated flash");
//     });
//   }
//
// };

MemoryGame.prototype.gameOverTaunt = function () {
  $("#gameOver").addClass("animated zoomInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $("#gameOver").removeClass("animated zoomInDown");
});
};
MemoryGame.prototype.tripFace = function () {
  $("#start").html('CUT THAT ISH OUT    '+ '<span id="star" class="glyphicon glyphicon-star"></span>');
  $("body").attr("id", "gradient");
};

MemoryGame.prototype.cutItOut = function () {
  $("#start").html('TRIP FACE  '+ '<span id="star" class="glyphicon glyphicon-star-empty"></span>');
  $("body").attr("id", "regular");
  $("body").attr("style", "");
};

MemoryGame.prototype.roundOverRollOut = function () {
  $(".eachCard").addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated rollOut");
});
};

MemoryGame.prototype.scoreCardHide = function () {
  $(".scoreCard").addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated rollOut");
});
}


// ====================================================================
// <span id="star" class="glyphicon glyphicon-star"></span>



$(document).ready(function(){

var click = 0;
// =====================NEW GAME START=================================================
$("div.col-xs-12.cntr").on("click", function(){
  click +=1
  if (click === 1) {
  var that = this;
  newGame = new MemoryGame;
  newGame.hideBrand();
  // newGame.whichDiffAnimation();
  newGame.whichDifficulty(that);
  newGame.shuffle();
  $(".actualScore").html(newGame.gamePoints);

} else if (click > 1) {
  // console.log("something");
};
})
// ==================NEW GAME========================================================
var tileClicks = 0

$(".eachCard").on("click", function(){
  // console.log("eachCard");
  tileClicks = tileClicks + 1;
  var thy = this;
  newGame.idToIndex(thy);
  newGame.selectCards(thy);
  newGame.pointerOff(0);
if(tileClicks === 2){
  if(newGame.selectedCards[0].color === newGame.selectedCards[1].color) {
    newGame.pushMatchedDivs();
    newGame.bounceScore();
    newGame.noThirdClicks();
    console.log("match");
    newGame.reduce(newGame.selectedCards[0].points, newGame.selectedCards[1].points);
    newGame.resetArrays();
    tileClicks = 0;

}
else if(newGame.selectedCards[0].color !== newGame.selectedCards[1].color){
  newGame.noThirdClicks();
  newGame.shakeTile();
    // newGame.pointerOff(1);
  setTimeout(function(){
    // newGame.pointerOn(0);
    // newGame.pointerOn(1);
    newGame.clearTileColor();
    newGame.subtractPoint();
    newGame.resetArrays();
    tileClicks = 0;
  }, 1000)
};


  }

if (newGame.pairsMatched === newGame.pairsNeeded){
  if (newGame.round === 1){
  newGame.roundOverRollOut();
  newGame.scoreCardHide();
  setTimeout(function(){
  // newGame.hideScoreCard()
  newGame.roundOneDone();
  newGame.removeAllTiles();
  newGame.resetTileNum();
  $(".scoreCard").addClass("invisible");
  newGame.showRoundOverCard();
  newGame.p1Score();
  newGame.blockMatchedDivs = [];
  // alert("FINALLY! You're score is " + newGame.player1score);
}, 900);
} else if (newGame.round === 2) {
  newGame.roundOverRollOut();
  newGame.scoreCardHide();
  setTimeout(function(){
  // newGame.hideScoreCard();
  $("#start2").css("pointer-events", "none");
  newGame.pushScoreToPlayer();
  newGame.removeAllTiles();
  newGame.resetTileNum();
  newGame.showRoundOverCard();
  $(".scoreCard").addClass("invisible");
  newGame.p2Score();
  newGame.evaluateScores();
  newGame.gameOverTaunt();
}, 900)


  // setTimeout(function(){
  //   newGame.gameOverTaunt();
  // }, 2000)

}
};



});

$("#start2").on("click", function (){
  $(".scoreCard").removeClass("invisible");
  newGame.gameCards = [];
  console.log("1==========="+ newGame.gameCards);
  newGame.round2Diff();
  console.log("2============"+ newGame.gameCards);
  newGame.shuffle();
  $(".actualScore").html(newGame.gamePoints);
  newGame.hideRoundOverCard();
  newGame.showP1Score();
  // newGame.showScoreCard();
});


$("#replay").on("click", function(){
  newGame.reloadPage();
});


$("#start").on("click", function(){
  newGame.tripFaceClicks ++;
  if (newGame.tripFaceClicks%2 != 0){
    newGame.tripFace();
  }else if (newGame.tripFaceClicks%2 === 0 ) {
    newGame.cutItOut();
  }
  });

































});
