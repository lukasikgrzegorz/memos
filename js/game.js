localStorage.clear();


const refs = {
    cardsNumber : 16,
    moveCounter : 0,
    cardTemp : [],
    statusTemp : {},
    gameBox: document.querySelector("[js-gamebox]"),
    
    randomColor(){
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    },

    createColorPair(){
        let newArray = [];
        for (i = 0; i < this.cardsNumber / 2; i++) {
            newArray.push(this.randomColor());
        }
        return newArray;
    },

    shuffleColors(array){
        let newArray = array.sort(() => Math.random() - .5)
        return newArray;
    },

    createCards(array){  
        for (i = 0; i < this.cardsNumber; i++){
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.id = `card-${i}`;
            newCard.setAttribute("data-color", array[i]);
            this.statusTemp[`${newCard.id}`] = { color: array[i], status: "back" };
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

    checkWin(){
        let array = [];
        for (let key in this.statusTemp) {
            array.push(this.statusTemp[key].status);
        }
        if (array.every(e => e === "clear")) {
            localStorage.clear();    
            setTimeout(()=>window.location.reload(),1000)
        }
    },

    checkLocalTemp(){
        if (localStorage.getItem("gameStatus")) {
            this.statusTemp = JSON.parse(localStorage.getItem("gameStatus"));
        }
    },

    tempUpdate(){
        localStorage.setItem("gameStatus", JSON.stringify(this.statusTemp));     
    },

    createCardsFromTemp(){ 
        for (i = 0; i < this.cardsNumber; i++){
            const newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.id = `card-${i}`;
            newCard.setAttribute("data-color", this.statusTemp[`card-${i}`].color);
            const newCardWrapper = document.createElement("div");
            newCardWrapper.classList.add("card__wrapper");   
            const newCardBack = document.createElement("div");
            newCardBack.classList.add("card__back");
            const newCardFront = document.createElement("div");
            newCardFront.classList.add("card__front");
            newCardFront.style.backgroundColor = this.statusTemp[`card-${i}`].color;
            
            if (this.statusTemp[`card-${i}`].status === "clear") {
                newCard.classList.add("no-visible");    
            }

            newCardWrapper.append(newCardBack, newCardFront);
            newCard.append(newCardWrapper);
            this.gameBox.append(newCard);
        }
    },  
    
    nweGame() {
        this.checkLocalTemp();
        if (!localStorage.getItem("gameStatus")) {
            let colorPair = this.createColorPair();
            colorPair = colorPair.concat(colorPair);
            let colorPairShuffled = this.shuffleColors(colorPair);
            this.createCards(colorPairShuffled);
        } else {
            this.createCardsFromTemp();
        } 
    }
}

refs.nweGame();

//Main Event Listener

refs.gameBox.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("card") && refs.cardTemp.length < 2) {
        
        e.target.classList.toggle("flip");
        e.target.firstElementChild.classList.toggle("flip");
        refs.cardTemp.push({ id: `#${e.target.id}`, bgCol: e.target.getAttribute("data-color") });
        refs.moveCounter++;
        refs.statusTemp[`${e.target.id}`].status = "front";
        refs.tempUpdate();

        
        if (refs.moveCounter === 2) {
            
            item1 = document.querySelector(refs.cardTemp[0].id);
            item2 = document.querySelector(refs.cardTemp[1].id);
           
            if (refs.cardTemp[0].bgCol === refs.cardTemp[1].bgCol && refs.cardTemp[0].id !== refs.cardTemp[1].id) {
                setTimeout(() => {
                    item1.classList.add("no-visible");
                    item2.classList.add("no-visible");
                    refs.statusTemp[`${item1.id}`].status = "clear";
                    refs.statusTemp[`${item2.id}`].status = "clear";
                    refs.tempUpdate();
                    refs.moveCounter = 0;
                    refs.cardTemp = [];
                    refs.checkWin();
                }, 1200)
            } else {
                setTimeout(() => {
                    item1.classList.toggle("flip");
                    item1.firstElementChild.classList.toggle("flip");
                    item2.classList.toggle("flip");
                    item2.firstElementChild.classList.toggle("flip");
                    refs.statusTemp[`${item1.id}`].status = "back";
                    refs.statusTemp[`${item2.id}`].status = "back";
                    refs.tempUpdate();
                    refs.moveCounter = 0;
                    refs.cardTemp = [];
                }, 1200)
               
            }

        }
    }
    
})

const checkWindow = () => {
    if (window.innerWidth > window.innerHeight) {
    refs.gameBox.classList.add("gamebox--vmin");
    } else {
        refs.gameBox.classList.add("gamebox--vmax");
    } 
}    

checkWindow();


window.addEventListener('resize', () => {

    if(window.innerWidth < window.innerHeight){
        refs.gameBox.classList.remove("gamebox--vmin"); 
        refs.gameBox.classList.add("gamebox--vmax");   
    } else {
        refs.gameBox.classList.remove("gamebox--vmax"); 
        refs.gameBox.classList.add("gamebox--vmin");      
    }

});
    
