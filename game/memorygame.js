const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
    console.log("clickity time!")
  
    this.classList.toggle('flip');
  
    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
    } else {
        hasFlipped = false;
        secondCard = this;
        
        
}
