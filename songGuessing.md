<html>

<div id='content'>
<p id = "randomWord"> </p>
<form id='songGuessingForm'>
<div class='form-uname'>
    <label id='guess' for='guess'>Enter Your Guess:</label>
    <input id='guessText' type='text' maxlength='30'>
</div>
<div class='form-sub'>
    <button id='subButton' type='button' onclick = "checkAnswer()">Guess!</button>
    <button onclick = "startGame(0,0)" >Reset Game</button>
</div>
</form>

<div id="text">
  <p id = "attemptsText"> Attempts: 0</p>
  <p id = "correctText"> Songs Guessed Correctly: 0</p>
  <p id = "resultText"> </p>
</div>

<script type="text/javascript">

const songList = ["Blank Space", "Shake it Off", "Bad Blood", "Love Story", "Anti-Hero", "All Too Well", "Look What You Made Me Do", "I Knew You Were Trouble", "ME!", "Style", "We Are Never Ever Getting Back Together", "Lover", "Delicate"];

let answer = ""
let attempts = 0
let correct = 0

function chooseSong() {
    return songList[Math.floor(Math.random() * songList.length)];
}

// function stringToList(string) {
//   // list to store the characters
//   const characters = [];

//   // Loops through each character in the string and appends them to the list
//   for (let i = 0; i < string.length; i++) {
//     characters.push(string[i]);
//   }

//   // Returns the list of characters
//   return characters;
// }
function startGame(attempts, correct) {
    // attempts = 0
    // correct = 0
    answer = chooseSong()
    const newList = [...answer];

    let change = Math.floor(Math.random() * newList.length);
    while (newList[change] === " ") {
    change = Math.floor(Math.random() * newList.length);
    }

    let change2 = Math.floor(Math.random() * newList.length);
    while (newList[change2] === " " || change2 === change) {
    change2 = Math.floor(Math.random() * newList.length);
    }

    newList[change] = "_";
    newList[change2] = "_";

    let joined = "";
    for (let i = 0; i < newList.length; i++) {
    joined += newList[i];
    }
    document.getElementById("randomWord").innerHTML = joined
}

function checkAnswer() {
    let guess = document.getElementById("guessText").value
    attempts++
    if (guess.toLowerCase() === answer.toLowerCase()) {
        document.getElementById("resultText").innerHTML = "'" + answer + "'" + " is the correct answer!"
        correct++
        startGame(attempts, correct)
    }
    else {
        document.getElementById("resultText").innerHTML = "'" + guess + "'" + " is incorrect. Try again."
    }
    document.getElementById("attemptsText").innerHTML = "Attempts: " + attempts
    document.getElementById("correctText").innerHTML = "Songs Guessed Correctly: " + correct
}

startGame(0,0)


</script>