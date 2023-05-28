// Kudos to https://marina-ferreira.github.io/tutorials/js/memory-game/ for the help!!!
// This part is for the cards and the memory game
// Kudos to the W3Schools countdown timer lesson!
// I thought it would be more convenient to have it count up
// https://www.w3schools.com/howto/howto_js_countdown.asp


const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

var matches = 0;
var sec = 0;
var money = 0;
var beforeTime = 0;
var afterTime = 0;
// console.log(sec)
let gameInactive = true;
let gameOver = false;
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

// anti-cheating mechanism. Will detect use of inspect element.
// Inspect element can be used to cheat by seeing which pairs
// match before starting

function detectCheating() {
    // console.log("Checked for cheating")
    beforeTime = new Date().getTime();
    debugger;
    afterTime = new Date().getTime();
    if (afterTime - beforeTime > 100) {
        gameOver = true;
        document.getElementById("time").innerHTML = "You have been caught cheating! Please reload the page without inspect element open before playing.";
    }
}



function clearVar() {
    [hasFlipped, lockdown] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function noFlip() {
    // console.log("event listener removed!");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    clearVar();
}

function reject() {
    lockdown = true;
    // console.log("failure to match detected! Locking board...");        
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        clearVar();
        // console.log("board unlocked");
    }, 500); // this is lower than the tutorial because this will be a fast-paced game
}

function updateMoney() {
    // console.log("Timecheck: " +sec);
    if (sec < 10) {
        money += 3;
    } else if (sec < 20) {
        money += 2;
    } else {
        money += 1;
    }
    if (matches == 8) {
        money += 1;
        document.getElementById("time").innerHTML = "Congrats on Finishing! Play again to see how close you can get to 25 Swifties!";
        gameOver = true;
    }
    console.log(money);
    document.getElementById("swifties").innerHTML = "Swifties Earned: " + money + " Swifties";
}

function timer() {
    // console.log(sec);
    if (gameInactive) return;
    if (sec == 29) {
        document.getElementById("time").innerHTML = "Time's up!";
        gameOver = true;
    }
    if (gameOver) return;
    var currentTime = new Date().getTime();
    var diff = currentTime - startTime;
    sec = Math.floor(diff % (1000 * 60) / 1000);
    document.getElementById("time").innerHTML = "Time Elapsed: " + sec + " seconds";
    return sec;
}

function timedExecutables() {
    if (gameOver) return;
    detectCheating(); 
    timer();
}

// run the function every ___ milliseconds according to second argument
// For some reason you can only have one setInterval running
// so I lapped the two functions into a parent

setInterval(timedExecutables, 1000);

function checkMatching() {
     if (firstCard.dataset.framework === secondCard.dataset.framework) {
            noFlip();
            matches += 1;
            updateMoney();
            // console.log("match detected!");
        } else {
            reject()
        }
}

function flipCard() {
    if (lockdown) return;
    if (gameOver) return;
    if (this === firstCard) {
        // console.log("Select another card");
        return;
    }
    // console.log("clickity time!");
  
    this.classList.add('flip');
  
    if (!hasFlipped) {
        if (gameInactive) {
            gameInactive = false;
            startTime = new Date().getTime();
        }
        hasFlipped = true;
        firstCard = this;
        // console.log("first card detected! This card is ");
        // console.log(firstCard);
    } else {
        secondCard = this;
        // console.log("second card detected! This card is");
        // console.log(secondCard);
        checkMatching()
    }
}

