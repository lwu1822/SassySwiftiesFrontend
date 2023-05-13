const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlipped = false;
let lockdown = false;
let firstCard, secondCard;

function noFlip() {
    console.log("event listener removed!");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

function reject() {
    lockdown = true;
    console.log("failure to match detected! Locking board...");        
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockdown = false;
        console.log("board unlocked");
    }, 500); // this is lower than the tutorial because this will be a fast-paced game
}

function checkMatching() {
     if (firstCard.dataset.framework === secondCard.dataset.framework) {
            noFlip()
            console.log("match detected!");
        } else {
            reject()
        }
}

function flipCard() {
    if (lockdown) return;
    if (this === firstCard) {
        console.log("Stop cheating!");
        return;
    }
    console.log("clickity time!");
  
    this.classList.add('flip');
  
    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        console.log("first card detected! This card is ");
        console.log(firstCard);
    } else {
        hasFlipped = false;
        secondCard = this;
        console.log("second card detected! This card is");
        console.log(secondCard);
        checkMatching()
    }
}
