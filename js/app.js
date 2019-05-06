/*
 * Create a list that holds all of your cards
 */
 var cardlist = ["fa fa-diamond","fa fa-diamond",
                    "fa fa-paper-plane-o","fa fa-paper-plane-o",
                    "fa fa-anchor","fa fa-anchor",
                    "fa fa-bolt","fa fa-bolt",
                    "fa fa-cube","fa fa-cube",
                    "fa fa-leaf","fa fa-leaf",
                    "fa fa-bicycle","fa fa-bicycle",
                    "fa fa-bomb","fa fa-bomb"];

var move = document.getElementsByClassName("moves")[0].innerText;

var restartButton = document.querySelector('.restart');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function removeStar(){
	var star = document.querySelector('.stars');
		star.removeChild(star.firstChild);
        return;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function newGame(){
     //deck
     var deck = document.querySelector('.deck');
     shuffle(cardlist);
     var output = '';
     for(var i = 0; i < cardlist.length; i++){
         output += '<li class="card" data-card = "' + cardlist[i] + '"><i class="' + cardlist[i] + '"></i></li>';
     }
     deck.innerHTML = output;

     //stars
     var star = document.querySelector('.stars');
     var starOut = '';
     for(var i = 0; i < 3; i++){
         starOut += '<li><i class="fa fa-star"></i></li>';
     }
     star.innerHTML = starOut;

     var allCards = document.querySelectorAll('.card');
     var openCards = [];

     allCards.forEach(function(card){
       card.addEventListener('click', function(e) {

         if (openCards.length <2){

           if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
             openCards.push(card);

             if(!card.classList.contains('open') && !card.classList.contains('show')){
               move = parseInt(move) + 1;
               document.getElementsByClassName("moves")[0].innerText = move;
               //remove star according to moves
               if (parseInt(move) == 30 || parseInt(move) == 50 || parseInt(move) == 70) {
                   removeStar();
               };
             };

             //opens the clicked card
             card.classList.add('open', 'show');

             if (openCards.length == 2){

               if (openCards[0].dataset.card == openCards[1].dataset.card){
                 openCards[0].classList.add('match');
                 openCards[0].classList.add('open');
                 openCards[0].classList.add('show');

                 openCards[1].classList.add('match');
                 openCards[1].classList.add('open');
                 openCards[1].classList.add('show');

                 openCards = [];

               } else {
                   setTimeout(function(){
                         openCards.forEach(function(card){
                           card.classList.remove('open', 'show')
                         });

                         openCards = [];
                     }, 700);
               }

             }
           }
         };

       });
     });
 }

 newGame();

 restartButton.addEventListener('click', function(){
   //sets the move value back to 0
   move = 0;
   document.getElementsByClassName("moves")[0].innerText = move;

   //clear the deck
   var deck = document.querySelector('.deck');
   deck.innerHTML = "";

   //start new game
   newGame();

 });
