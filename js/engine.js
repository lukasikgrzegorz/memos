const engine = {
    gameBox: document.querySelector("[js-gamebox]"),
    cardsAmount : 16,
    moveCounter : 0,
    chosenCard : [],
    stateTemp: {},
    settings:{arcadeMode:false,level:0},
     
    randomColor(){
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    },

    createColorPair(){
        let newArray = [];
        for (i = 0; i < this.cardsAmount / 2; i++) {
            newArray.push(this.randomColor());
        }
        return newArray;
    },

    shuffleColors(array){
        let newArray = array.sort(() => Math.random() - .5)
        return newArray;
    },

    createCards(array){  
        for (i = 0; i < this.cardsAmount; i++){
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.id = `card-${i}`;
            newCard.setAttribute("data-color", array[i]);
            this.stateTemp[`${newCard.id}`] = { color: array[i], status: "back" };
            const newCardWrapper = document.createElement("div");
            newCardWrapper.classList.add("card__wrapper");
            const newCardBack = document.createElement("div");
            newCardBack.classList.add("card__back");
            const newCardFront = document.createElement("div");
            newCardFront.classList.add("card__front");
            newCardFront.style.backgroundColor = array[i];
            newCardWrapper.append(newCardBack, newCardFront);
            newCard.append(newCardWrapper);
            this.gameBox.append(newCard);
        }
    },

    checkLocalTemp(){
        if (localStorage.getItem("gameStatus")) {
            this.stateTemp = JSON.parse(localStorage.getItem("gameStatus"));
            interface.continueBtn.removeAttribute("disabled");
        }
        if (localStorage.getItem("gameSettings")) {
            this.settings = JSON.parse(localStorage.getItem("gameSettings"));
        }
    },

    tempUpdate(){
        localStorage.setItem("gameStatus", JSON.stringify(this.stateTemp)); 
        localStorage.setItem("gameSettings", JSON.stringify(this.settings)); 
    },

    newGame() {
        this.settings = { arcadeMode: false, level: 0 };
        localStorage.clear();
        let colorPair = this.createColorPair();
        colorPair = colorPair.concat(colorPair);
        let colorPairShuffled = this.shuffleColors(colorPair);
        this.createCards(colorPairShuffled);   
    },

    continueGame(){ 
        if (this.settings.arcadeMode) {
            this.cardsAmount += 8 * this.settings.level;
        }

        for (i = 0; i < this.cardsAmount; i++){
            console.log(i);
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.id = `card-${i}`;
            newCard.setAttribute("data-color", this.stateTemp[`card-${i}`].color);
            const newCardWrapper = document.createElement("div");
            newCardWrapper.classList.add("card__wrapper");   
            const newCardBack = document.createElement("div");
            newCardBack.classList.add("card__back");
            const newCardFront = document.createElement("div");
            newCardFront.classList.add("card__front");
            newCardFront.style.backgroundColor = this.stateTemp[`card-${i}`].color;
            
            if (this.stateTemp[`card-${i}`].status === "clear") {
                newCard.classList.add("no-visible");    
            }

            newCardWrapper.append(newCardBack, newCardFront);
            newCard.append(newCardWrapper);
            this.gameBox.append(newCard);
        }
    },

    arcade(isNew) {
        if(isNew){
            this.settings = { arcadeMode: false, level: 0 };
            localStorage.clear();
        }
        this.settings.arcadeMode = true;
        this.stateTemp = {};
        this.cardsAmount = 16+this.settings.level*8;
        let colorPair = this.createColorPair();
        colorPair = colorPair.concat(colorPair);
        let colorPairShuffled = this.shuffleColors(colorPair);
        this.createCards(colorPairShuffled); 
        this.tempUpdate();
    },

    checkWin(){
        let array = [];
        for (let key in this.stateTemp) {
            array.push(this.stateTemp[key].status);
        }
        if (array.every(e => e === "clear")) {
            localStorage.clear();    
            if (this.settings.arcadeMode === false) {
                setTimeout(() => window.location.reload(), 1000)    
            }
            if(this.settings.arcadeMode === true){
                setTimeout(() => {
                    this.settings.level++;
                    this.gameBox.innerHTML = "";
                    this.arcade();
                },1200) 
            }
            
        }
    }

}

engine.checkLocalTemp();
