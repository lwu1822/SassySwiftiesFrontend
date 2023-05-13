const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
    console.log("clickity time!")
  
    this.classList.add('flip');
  
    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        console.log("first card detected!");
    } else {
        hasFlipped = false;
        secondCard = this;
        console.log("second card detected!");
    }
    
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        console.log("match detected!");
    } else {
        console.log("failure to match detected!");
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 500); // this is lower than the tutorial because this will be a fast-paced game
    }
}
