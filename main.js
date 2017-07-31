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
    // console.log("easy");
    this.unlockEasyRows();
    for (var i = 0; i < 6; i ++ ){
      this.createNewPair();
    }
    console.log(this.gameCards)

  }
   else if ($(that).attr("id") === "medium"){
    // console.log("medium");
    this.unlockMediumRows();
  for (var i = 0; i < 10; i ++ ){
    this.createNewPair();
  }
} else if ($(that).attr("id")==="hard") {
    // console.log("hard");
    this.unlockHardRows();
  for (var i = 0; i < 12; i ++ ){
    this.createNewPair();
  }
  console.log(this.gameCards)

}
$("#diff").remove();
$(".scoreCard").toggleClass("invisible");
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
// =======================================================================

MemoryGame.prototype.selectCards = function(thy) {
  var selectedId = $(thy).attr("id");
  var selectedIdArray = selectedId.split("tile");
  var selectedIndex = selectedIdArray[1];
  this.selectedCards.push(newGame.gameCards[selectedIndex]);
  console.log(this.selectedCards);
  this.selectedPoints.push(newGame.gameCards[selectedIndex].points);
  console.log(this.selectedPoints);

};

MemoryGame.prototype.reduce = function(a,b){
this.gamePoints = this.selectedPoints.reduce(function(a,b){
  return a + b;
}, this.gamePoints);
$(".actualScore").html(this.gamePoints);
};

MemoryGame.prototype.subtractPoint = function () {
  this.selectedCards[0].points --;
  console.log(this.selectedCards[0].points);
  $(this.selectedDivs[0]).html(this.selectedCards[0].points);
  this.selectedCards[1].points --;
    $(this.selectedDivs[1]).html(this.selectedCards[1].points);
  console.log(this.selectedCards[1].points);


};
MemoryGame.prototype.clearTileColor = function () {
  $(this.selectedDivs[0]).css("background-color", "");
  $(this.selectedDivs[1]).css("background-color", "");
};

MemoryGame.prototype.resetArrays = function () {
  this.selectedCards = [];
  this.selectedPoints = [];
  this.selectedDivs = [];
};



var newGame = "";

// ====================================================================




$(document).ready(function(){

var click = 0;
// =====================NEW GAME START=================================================
$("div.col-xs-12.cntr").on("click", function(){
  click +=1
  if (click === 1) {
  var that = this;
  newGame = new MemoryGame;
  newGame.whichDifficulty(that);
  newGame.shuffle();
  $(".actualScore").html(newGame.gamePoints);

} else if (click > 1) {
  console.log("something");
};
})
// ==================NEW GAME========================================================
var tileClicks = 0

$(".eachCard").on("click", function(){
  tileClicks = tileClicks + 1;
  var thy = this;
  newGame.idToIndex(thy);
  newGame.selectCards(thy);

if(tileClicks === 2){
  if(newGame.selectedCards[0].color === newGame.selectedCards[1].color) {
    console.log("match");
    newGame.reduce(newGame.selectedCards[0].points, newGame.selectedCards[1].points);
    newGame.resetArrays();
    tileClicks = 0;

}
else if(newGame.selectedCards[0].color !== newGame.selectedCards[1].color){
    newGame.subtractPoint();
    newGame.clearTileColor();
    newGame.resetArrays();
    tileClicks = 0;

};
  // newGame.pointsToHtml(thy);
  // newGame.pushToSelected(thy);
  }
})



































});
