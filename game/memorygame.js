const cards = document.querySelectorAll('.box');

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    console.log("clickity time!")
  
    this.classList.toggle('flip');
  
  
}
