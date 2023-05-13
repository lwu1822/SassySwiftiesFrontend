const cards = document.queryselectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    console.log("clickity time!")
    //if (lockBoard) return;
    //if (this === firstCard) return;
  
    this.classList.toggle('flip');
  
    //if (!hasFlippedCard) {
      //hasFlippedCard = true;
      //firstCard = this;
  
      //return;
    }
  
    //secondCard = this;
    //checkForMatch();
  }
  
//function checkForMatch() {
    //let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    //isMatch ? disableCards() : unflipCards();
  }
  
//function disableCards() {
    //firstCard.removeEventListener('click', flipCard);
    //secondCard.removeEventListener('click', flipCard);
  
    //resetBoard();
  }
  
//function unflipCards() {
    //lockBoard = true;
  
    //setTimeout(() => {
      //firstCard.classList.remove('flip');
      //secondCard.classList.remove('flip');
  
      //resetBoard();
    //}, 1500);
  }
  
//function resetBoard() {
    //[hasFlippedCard, lockBoard] = [false, false];
    //[firstCard, secondCard] = [null, null];
  }
  
//function shuffle() {
    //cards.forEach(card => {
      //let randomPos = Math.floor(Math.random() * 12);
      //card.style.order = randomPos;
    });
  }


