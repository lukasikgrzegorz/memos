let cardsNumber = 24;
let moveCounter = 0;
let cardTemp = [];
let statusTemp = {};


if (localStorage.getItem("gameStatus")) {
    statusTemp = JSON.parse(localStorage.getItem("gameStatus"));
}

const gameBox = document.querySelector("[js-gamebox]");

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const createColorPair = () => {

    let newArray = [];

    for (i = 0; i < cardsNumber / 2; i++) {
        newArray.push(randomColor());
    }

    return newArray;
}

const shuffleColors = (array) => {
    let newArray = array.sort(() => Math.random() - .5)
    
    return newArray;
}

const createCards = (array) => {
    
    for (i = 0; i < cardsNumber; i++){
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.id = `card-${i}`;
        newCard.setAttribute("data-color", array[i]);

        statusTemp[`${newCard.id}`] = { color: array[i], status: "back" };
       
        const newCardWrapper = document.createElement("div");
        newCardWrapper.classList.add("card__wrapper");
        
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("card__back");
        
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("card__front");
        newCardFront.style.backgroundColor = array[i];
        
        newCardWrapper.append(newCardBack, newCardFront);
        newCard.append(newCardWrapper);
        gameBox.append(newCard);
    }
}

const checkWin = () => {
    let array = [];
    
    for (let key in statusTemp) {
        array.push(statusTemp[key].status);
    }

    if (array.every(e => e === "clear")) {
        localStorage.clear();    
        setTimeout(()=>window.location.reload(),1000)
    }
}

//Local storage read

const statusTempUpdate = () => {
    localStorage.setItem("gameStatus", JSON.stringify(statusTemp));     
}

const statusTempState = () => {
    
    for (i = 0; i < cardsNumber; i++){
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.id = `card-${i}`;
        newCard.setAttribute("data-color", statusTemp[`card-${i}`].color);

        const newCardWrapper = document.createElement("div");
        newCardWrapper.classList.add("card__wrapper");
        
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("card__back");
        
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("card__front");
        newCardFront.style.backgroundColor = statusTemp[`card-${i}`].color;

        if (statusTemp[`card-${i}`].status === "clear") {
            newCard.classList.add("no-visible");    
        }
        
        newCardWrapper.append(newCardBack, newCardFront);
        newCard.append(newCardWrapper);
        gameBox.append(newCard);
        
    }
}

//New Game

if (!localStorage.getItem("gameStatus")) {
    let colorPair = createColorPair();
    colorPair = colorPair.concat(colorPair);
    colorPairShuffled = shuffleColors(colorPair);
    createCards(colorPairShuffled);
} else {
    statusTempState();
} 



//Main Event Listener

gameBox.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("card") && cardTemp.length<2){
        
        e.target.classList.toggle("flip");
        e.target.firstElementChild.classList.toggle("flip"); 
        cardTemp.push({id: `#${e.target.id}`, bgCol: e.target.getAttribute("data-color")});
        moveCounter++;
        statusTemp[`${e.target.id}`].status = "front";
        statusTempUpdate();

        
        if (moveCounter === 2) {
            
            item1 = document.querySelector(cardTemp[0].id);
            item2 = document.querySelector(cardTemp[1].id);
           
            if (cardTemp[0].bgCol === cardTemp[1].bgCol && cardTemp[0].id !== cardTemp[1].id ) {   
                setTimeout(()=>{
                    item1.classList.add("no-visible");
                    item2.classList.add("no-visible");
                    statusTemp[`${item1.id}`].status = "clear";
                    statusTemp[`${item2.id}`].status = "clear";
                    statusTempUpdate();
                    moveCounter = 0;
                    cardTemp = [];
                    checkWin();
                },1200)
            } else {
                setTimeout(()=>{
                    item1.classList.toggle("flip");
                    item1.firstElementChild.classList.toggle("flip");
                    item2.classList.toggle("flip");
                    item2.firstElementChild.classList.toggle("flip");
                    statusTemp[`${item1.id}`].status = "back";
                    statusTemp[`${item2.id}`].status = "back";
                    statusTempUpdate();
                    moveCounter = 0;
                    cardTemp = [];
                },1200)
               
            }

        }
    }
    
})


