var gameDiv = document.getElementById("game");
var gameRow = "<div class='container'>    <div class='container'><div class='row'><div class='col-xs-12 '><div class='col-xs-3 '><div id='tile1' class='eachCard col-centered'>#</div></div><div class='col-xs-3'> <div class='eachCard col-centered'> # </div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div></div>          <div class='col-xs-3'>            <div class='eachCard col-centered'>#</div>          </div>        </div>      </div>    </div>  </div>";

function createRow(){
$("#game").append(gameRow);
}

function IndCard(color){
  this.color = color;
}


function MemoryGame(){
  this.gameCards = [];
  // this.createNewCardSet();
  }
MemoryGame.prototype.createNewPair = function()
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  var card = new IndCard(color)
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

MemoryGame.prototype.whichDifficulty = function(that){
  if ($(that).attr("id") === "easy"){
    console.log("easy");
    for (var i = 0; i < 3; i++) {
        createRow();
    }
    for (var i = 0; i < 6; i ++ ){
      this.createNewPair();
    }
    console.log(this.gameCards)

  }
   else if ($(that).attr("id") === "medium"){
    console.log("medium");
    for (var i = 0; i < 5; i++) {
        createRow();
  }
  for (var i = 0; i < 10; i ++ ){
    this.createNewPair();
  }
} else if ($(that).attr("id")==="hard") {
    console.log("hard");
    for (var i = 0; i < 6; i++) {
        createRow();
  }
  for (var i = 0; i < 12; i ++ ){
    this.createNewPair();
  }
}
// $("#diff").remove();
// $(".scoreCard").toggleClass("invisible");
};





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
  $("#diff").remove();
  $(".scoreCard").removeClass("invisible");
  newGame = new MemoryGame;
  newGame.whichDifficulty(that);
  newGame.shuffle();
} else if (click > 1) {
  console.log("something");
}

})


$("#tile1").on("click", function(){
console.log("something");

})



































});
