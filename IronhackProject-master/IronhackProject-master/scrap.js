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


// MemoryGame.prototype.calculatePoints = function (){
//   var pointsId = $(thy).attr("id");
//   var pointsIdArray = pointsId.split("tile");
//   var pointsIndex = selectedPoints
//
// };


MemoryGame.prototype.pointerOffAll = function () {
  $(".eachCard.col-centered").addClass("blocked");
};

//362
newGame.pointerOffAll();


// set-timeout  if tile clicks ===2


MemoryGame.prototype.pushMatchedDivs = function (i) {
  this.blockMatchedDivs.push(this.selectedDivs[0]);
  this.blockMatchedDivs.push(this.selectedDivs[1]);
};

// MemoryGame.prototype.blockDivs = function () {
//   for (var i = 0; i < newGame.blockMatchedDivs.length; i++) {
//     $(this.blockMatchedDivs[i]).addClass("blocked");
//   }
// };




// MemoryGame proto newGame
// this.blockMatchedDivs = [];
//
============================
//373
newGame.pushMatchedDivs();

//280
MemoryGame.prototype.pointerOffAll = function () {
  $(".eachCard.col-centered").addClass("blocked");
};
