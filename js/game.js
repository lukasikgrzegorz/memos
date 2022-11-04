const gameField = document.querySelector("[js-game-field]");

engine = {
	
  params: {   
		START_AMOUNT : 16,
		INCREMENT_VALUE : 8,
		cards : [],
		level : 0,
    quickMode: false,
    clickedCards: [],
    cardsToFlip: [],
	},

	//Cards methods
  createCards() {
    let colors = [];
		const randomColor=()=>{return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`};
		const cardsAmount = this.params.START_AMOUNT + this.params.INCREMENT_VALUE * this.params.level;
		for (i = 0; i < cardsAmount/2; i++){colors.push(randomColor());}
		colors = colors.concat(colors); //Create color pairs
    colors.sort(() => Math.random() - 0.5); //Shuffle colors
    this.params.cards = colors.map((card) => ({ color: card, state: "back" })); //Create array of objects
	},

	renderCards(){
    let markup = this.params.cards.map((card, index) => {
      let isVisible = card.state === "clear" ? "no-visible" : "";
      return `<div class="card ${isVisible}" data-color="${card.color}" data-index="${index}">
                <div class="card__wrapper">
                  <div class="card__front" style="background-color:${card.color}"></div>
                  <div class="card__back"></div>
                </div>
              </div>`
    }).join("") 
    gameField.innerHTML = markup;
	},

	//Game methods
  newGame(isQuick) {
    isQuick ? engine.params.quickMode = true : engine.params.quickMode = false;
		this.createCards();
    this.renderCards();
    this.setTemp();
  },

  continueGame() {
    this.readTemp();
    this.renderCards();
  },
  
  checkPairs(e) {
    if (e.target.classList.contains("card") && engine.params.clickedCards.length<2 ){
      e.target.classList.toggle("flip");
      e.target.firstElementChild.classList.toggle("flip");
      engine.params.clickedCards.push(e.target.dataset.index);
      engine.params.cards[Number(e.target.dataset.index)].state = "front";
      if (engine.params.clickedCards.length === 2) {
        card1 = document.querySelector(`[data-index="${engine.params.clickedCards[0]}"]`);
        card2 = document.querySelector(`[data-index="${engine.params.clickedCards[1]}"]`);
        const sameIndex = card1.dataset.index === card2.dataset.index;
        const sameColor = card1.dataset.color === card2.dataset.color;
        sameColor && !sameIndex ? engine.resultHit() : engine.resultMiss();
      }
    }
  },

  resultHit(){
    setTimeout(() => {
      card1.classList.add("no-visible");
      card2.classList.add("no-visible");
      engine.params.cards[Number(card1.dataset.index)].state = "clear";
      engine.params.cards[Number(card2.dataset.index)].state = "clear";
      this.params.clickedCards = [];
      this.setTemp();
      this.checkWin();
    },400)  
  },

  resultMiss() {
    this.params.cardsToFlip.push(card1, card2);
    engine.params.cards[Number(card1.dataset.index)].state = "back";
    engine.params.cards[Number(card2.dataset.index)].state = "back";
    this.params.clickedCards = [];
    
    setTimeout(() => {  
      this.params.cardsToFlip[0].classList.toggle("flip");
      this.params.cardsToFlip[0].firstElementChild.classList.toggle("flip");
      this.params.cardsToFlip[1].classList.toggle("flip");
      this.params.cardsToFlip[1].firstElementChild.classList.toggle("flip");
      this.params.cardsToFlip.splice(0, 2); 
    },800)  
  },
  
  checkWin() {
    let winStatus = this.params.cards
      .map(({ state }) => state)
      .every(e => e === "clear"); 
    
    if (winStatus && !this.params.quickMode) {
      this.params.cards = [];
      this.params.level++;
      setTimeout(this.newGame(false),1200);
    }
    if (winStatus && this.params.quickMode){
      localStorage.clear();
      setTimeout(() => window.location.reload(),1200)
    }
  },

  //Local storage methods

  setTemp() {
    localStorage.setItem("gameParams", JSON.stringify(this.params));
  },

  readTemp() {
    this.params = JSON.parse(localStorage.getItem("gameParams"));  
  },

}

gameField.addEventListener("click", engine.checkPairs)