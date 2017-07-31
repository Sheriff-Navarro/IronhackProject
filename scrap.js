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
