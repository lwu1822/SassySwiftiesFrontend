// Kudos to https://marina-ferreira.github.io/tutorials/js/memory-game/ for the help!!!
// This part is for the cards and the memory game
// Kudos to the W3Schools countdown timer lesson!
// I thought it would be more convenient to have it count up
// https://www.w3schools.com/howto/howto_js_countdown.asp


const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

let gameInactive = true;
let hasFlipped = false;
let lockdown = false;
let firstCard, secondCard;

// functions wrapped in parenthesis are called immediately

(function randomize() {
    cards.forEach(card => {
        let Position = Math.floor(Math.random() * 20);
        card.style.order = Position;
    });
})();


function clearVar() {
    [hasFlipped, lockdown] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function noFlip() {
    console.log("event listener removed!");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    clearVar();
}

function reject() {
    lockdown = true;
    console.log("failure to match detected! Locking board...");        
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        clearVar();
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

function timer() {
    var currentTime = new Date().getTime();
    var diff = currentTime - startTime;
    var sec = Math.floor(diff % (1000 * 60) / 1000);
    document.getElementById("time").innerHTML = "Time Elapsed: " + sec + "seconds";
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
        if (gameInactive) {
            gameInactive = false;
            startTime = new Date().getTime();
        }
        hasFlipped = true;
        firstCard = this;
        console.log("first card detected! This card is ");
        console.log(firstCard);
    } else {
        secondCard = this;
        console.log("second card detected! This card is");
        console.log(secondCard);
        checkMatching()
    }
}

var time = setInterval(timer, 1000);
