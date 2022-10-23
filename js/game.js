let cardsNumber = 16;
let moveCounter = 0;
let cardTemp = [];

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
    let newArray = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    return newArray;
}

const createCards = () => {
    
    for (i = 0; i < cardsNumber; i++){
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.id = `card-${i}`;
        newCard.setAttribute("data-color", colorPairShuffled[i]);
        const newCardWrapper = document.createElement("div");
        newCardWrapper.classList.add("card__wrapper");
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("card__back");
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("card__front");
        newCardFront.style.backgroundColor = colorPairShuffled[i];
        newCardWrapper.append(newCardBack, newCardFront);
        newCard.append(newCardWrapper);
        gameBox.append(newCard);
    }
}


//New Game

let colorPair = createColorPair();
colorPair = colorPair.concat(colorPair);
colorPairShuffled = shuffleColors(colorPair);
createCards();


//Main Event Listener

gameBox.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("card") && cardTemp.length<2){
        
        e.target.classList.toggle("flip");
        e.target.firstElementChild.classList.toggle("flip"); 
        cardTemp.push({id: `#${e.target.id}`, bgCol: e.target.getAttribute("data-color")});
        moveCounter++;
        
        if (moveCounter === 2) {
            
            item1 = document.querySelector(cardTemp[0].id);
            item2 = document.querySelector(cardTemp[1].id);
           
            if (cardTemp[0].bgCol === cardTemp[1].bgCol && cardTemp[0].id !== cardTemp[1].id ) {   
                setTimeout(()=>{
                    item1.classList.add("no-visible");
                    item2.classList.add("no-visible");
                    moveCounter = 0;
                    cardTemp = [];
                },2000)
            } else {
                setTimeout(()=>{
                    item1.classList.toggle("flip");
                    item1.firstElementChild.classList.toggle("flip");
                    item2.classList.toggle("flip");
                    item2.firstElementChild.classList.toggle("flip");
                    moveCounter = 0;
                    cardTemp = [];
                },2000)
               
            }

        }
    }
    
})