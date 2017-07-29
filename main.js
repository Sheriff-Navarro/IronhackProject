var gameDiv = document.getElementById("game");
var gameRow = "<div class='container'>    <div class='container'><div class='row'><div class='col-xs-12 '><div class='col-xs-3 '><div id='tile1' class='eachCard col-centered'>#</div></div><div class='col-xs-3'> <div class='eachCard col-centered'> # </div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div>          </div>        </div>      </div>    </div>  </div>";

function createRow(){
$("#game").append(gameRow);
}

function IndCard(points, color){
  this.points = points;
  this.color = color;
}


function MemoryGame(){
  this.gameCards = [];
  this.selectedCards = [];
  // this.createNewCardSet();
  }
MemoryGame.prototype.createNewPair = function()
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  var card = new IndCard(10, color)
  this.gameCards.push(card);
  this.gameCards.push(card);
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
  }

  MemoryGame.prototype.unlockMediumRows = function(){
    this.unlockEasyRows();
    $("#mediumGame4").removeClass("invisible");
    $("#mediumGame5").removeClass("invisible");
  }

  MemoryGame.prototype.unlockHardRows = function(){
    this.unlockEasyRows();
    this.unlockMediumRows();
    $("#hardGame6").removeClass("invisible");
  }


MemoryGame.prototype.whichDifficulty = function(that){

  if ($(that).attr("id") === "easy"){
    console.log("easy");
    this.unlockEasyRows();
    for (var i = 0; i < 6; i ++ ){
      this.createNewPair();
    }
    console.log(this.gameCards)

  }
   else if ($(that).attr("id") === "medium"){
    console.log("medium");
    this.unlockMediumRows();
  for (var i = 0; i < 10; i ++ ){
    this.createNewPair();
  }
} else if ($(that).attr("id")==="hard") {
    console.log("hard");
    this.unlockHardRows();
  for (var i = 0; i < 12; i ++ ){
    this.createNewPair();
  }
  console.log(this.gameCards)

}
$("#diff").remove();
$(".scoreCard").toggleClass("invisible");
};

MemoryGame.prototype.idToIndex = function(thy) {
  var thisId = $(thy).attr("id");
  // console.log(thisId);
  var array = thisId.split("tile");
  var index = array[1];
  var indexToNum = Number(index);
  $(thy).css("background-color", newGame.gameCards[indexToNum].color);
}
//
// MemoryGame.prototype.pointsToHtml = function(thy) {
//   var thisId = $(thy).attr("id");
//   console.log(thisId);
//   var array = thisId.split("tile");
//   var index = array[1];
//   var indexToNum = Number(index);
//   $(thy).html(newGame.gameCards[indexToNum].points);
// find points, per click subtract points
// }

MemoryGame.prototype.selectCards = function(thy) {
  var selectedId = $(thy).attr("id");
  console.log(selectedId);
  var selectedIdArray = selectedId.split("tile");
  console.log(selectedIdArray);
  var selectedIndex = selectedIdArray[1];
  console.log(selectedIndex);
  this.selectedCards.push(selectedIndex);
  console.log(this.selectedCards);
  // $(thy).css("background-color", newGame.gameCards[indexToNum].color);
}

MemoryGame.prototype.calculatePoints = function (){
  var pointsId = $(thy).attr("id");
  var pointsIdArray = pointsId.split("tile");
  var pointsIndex = selectedPoints

}

//
// function createNewCardSet () {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   var card = new IndCard(color)
//   gameCards.push(card);
//   }




//
// function whichDifficulty(that){
//   if ($(that).attr("id") === "easy"){
//     console.log("easy");
//     for (var i = 0; i < 3; i++) {
//         createRow();
//     }
//     for (var i = 0; i < 6; i ++ ){
//       createNewCardSet();
//     }
//   }
//    else if ($(that).attr("id") === "medium"){
//     console.log("medium");
//     for (var i = 0; i < 5; i++) {
//         createRow();
//   }
//   for (var i = 0; i < 10; i ++ ){
//     createNewCardSet();
//   }
// } else if ($(that).attr("id")==="hard") {
//     console.log("hard");
//     for (var i = 0; i < 6; i++) {
//         createRow();
//   }
//   for (var i = 0; i < 12; i ++ ){
//     createNewCardSet();
//   }
// }
// $("#diff").remove();
// $(".scoreCard").toggleClass("invisible");
// };

var newGame = "";

// ====================================================================




$(document).ready(function(){

var click = 0;
$("div.col-xs-12.cntr").on("click", function(){
  click +=1
  if (click === 1) {
  var that = this

  // $("#diff").remove();
  // $(".scoreCard").removeClass("invisible");
  newGame = new MemoryGame;
  newGame.whichDifficulty(that);
  newGame.shuffle();
} else if (click > 1) {
  console.log("something");
}

})

var tileClicks = 0

$(".eachCard").on("click", function(){
  tileClicks = tileClicks + 1;
  console.log(tileClicks);
  var thy = $(this);
  newGame.idToIndex(thy);
  newGame.selectCards(thy);

if(tileClicks === 2){
  if(newGame.selectedCards[0].color === newGame.selectedCards[1].color)


}
else if(newGame.selectedCards[0].color != newGame.selectedCards[1].color)
  // newGame.pointsToHtml(thy);
  // newGame.pushToSelected(thy);


})




































});
