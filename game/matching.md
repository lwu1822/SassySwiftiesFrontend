# Matching!!!

First, credits. These album covers are copyrighted... so attribution is key.

| Album Cover | Source |
|-|-|
| Red | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Red.png |
| 1989 | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_1989.png|
| Reputation | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Reputation.png |
| Lover | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Lover.png |
| Folklore | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Folklore.png |
| Evermore | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Evermore.png | 
| Midnights | https://en.wikipedia.org/wiki/File:Midnights_-_Taylor_Swift.png |
| Lover (live from Paris) | https://en.wikipedia.org/wiki/File:Taylor_Swift_-_Lover_(Live_from_Paris).png | 



# Make as many matches as you can in 30 seconds!


Kudos to this [guide](https://marina-ferreira.github.io/tutorials/js/memory-game/). We wouldn't have gotten far without it.

Make matches to earn Swifties! Be sure to make as many matches as early as you can, because earlier matches will earn more Swifties. You will have 30 seconds to make as many matches as you can, and if you finish you will be awarded with a bonus Swifty. Try to shoot for the maximum of 25 Swifties!

Your 30 seconds will begin when you flip the first card. If the board size doesn't fit to your screen, try zooming in or out.


| Time Interval | Swifties Earned per Match |
|-|-|
| 0-9 seconds | 3 Swifties per match |
| 10-19 seconds | 2 Swifties per match |
| 20-29 seconds | 1 Swifty per match |


<p id="time">Time Elapsed: 0 seconds</p>

<p id="swifties">Swifties Earned: 0 Swifties</p>


<body class="MemBoard">
  <section class="board">

    <div class="box" data-framework = "album 1">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover1.png">
    </div>
    <div class="box" data-framework = "album 1">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover1.png">
    </div>
    <div class="box" data-framework = "album 2">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover2.png">
    </div>
    <div class="box" data-framework = "album 2">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover2.png">
    </div>
    <div class="box" data-framework = "album 3">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover3.png">
    </div>
    <div class="box" data-framework = "album 3">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover3.png">
    </div>
    <div class="box" data-framework = "album 4">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover4.png">
    </div>
    <div class="box" data-framework = "album 4">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover4.png">
    </div>
    <div class="box" data-framework = "album 5">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover5.png">
    </div>
    <div class="box" data-framework = "album 5">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover5.png">
    </div>
    <div class="box" data-framework = "album 6">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover6.png">
    </div>
    <div class="box" data-framework = "album 6">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover6.png">
    </div>
    <div class="box" data-framework = "album 7">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover7.png">
    </div>
    <div class="box" data-framework = "album 7">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover7.png">
    </div>
    <div class="box" data-framework = "album 8">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover8.png">
    </div>
    <div class="box" data-framework = "album 8">
      <img class="Swift" src="images/cover.jpg">
      <img class="Flipped" src="images/Cover8.png">
    </div>
  </section>

  <!-- <script src="memorygame.js"></script> -->
  
</body>


<script type="text/javascript" src="{{ site.baseurl }}/getUsername.js"></script>

<script>

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
          money = 0;
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
        sendMoney();
      }
      //console.log(money);
      document.getElementById("swifties").innerHTML = "Swifties Earned: " + money + " Swifties";
  }

  function timer() {
      // console.log(sec);
      if (gameInactive) return;
      if (sec == 29) {
          document.getElementById("time").innerHTML = "Time's up!";
          gameOver = true;

        sendMoney();
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
      //detectCheating(); 
      timer();

      if (gameOver) {
          console.log("over");
          // uncomment once backend is up
          sendMoney();
      }
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


async function sendMoney() {
    let data = await fetchUsername();

    let username = data["sub"];
    console.log(username)
}
  
const url = "https://taylorswifties.duckdns.org/api/users/updateTokens"

const requestOptions = {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        };

//        document.getElementById("message").innerHTML ="jsjsjs";

        // Fetch JWT
        fetch(url, requestOptions)
        .then(response => {
            // trap error response from Web API
            if (response.status !== 200) {
                var message = 'Update Token error: ' + response.status + " " + response.statusText;
                if (response.status == 400 ) {
                  var message = 'HTTP Error 400. We messed up fetch.'
                }
                console.log(message);
                localStorage.removeItem("username");
                return;
            }
  
            response.json().then(data => {
                var message = "successfully sent the tokens";
                console.log(message);
            })
        })
// alternative way to do async/await that also works
/*
 function sendMoney() {
        fetchUsername().then(data => {
            console.log(data);
        })
    }
    */


  function sendMoney2() {
      let username = getUsername();
      console.log(username);
      /*
          document.getElementById("error").innerHTML = "";


          var baseurl = "https://taylorswifties.duckdns.org/api/users/updateTokens";
        
          const body = {
              username: document.getElementById("username").value,
              token: money
          };

          // Set Headers to support cross origin
          //IMPORTANT!!!!!!! TO SUCCESSFULLY POST, YOU NEED TO REMOVE
          // credentials:'include'
          const requestOptions = {
              method: 'POST',
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              //credentials: 'include', // include, *same-origin, omit
              body: JSON.stringify(body),
              headers: {
                  "content-type": "application/json"
              },
          };

          // Fetch JWT
          fetch(baseurl, requestOptions)
          .then(response => {
              // trap error response from Web API
              if (!response.ok) {
                  const errorMsg = response.status + " error";
                  console.log(errorMsg);

                  if (response.status === 400) {
                      console.log("Incorrect username or password");
                      
                    
                  }
              
                  return;
              }

              response.json().then(data => {
                  console.log(data);

              })

          })
      */
  }


</script>




