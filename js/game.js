const gameField = document.querySelector("[js-game-field]");

let cards = [];
const START_AMOUNT = 16;
const INCREMEN_VALUE = 8;

const randomColor= () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const createCards = (cardsAmount) => {
    for (i = 0; i < cardsAmount/2; i++){
        cards.push({["color"]: randomColor(),});
    }
    cards = cards.concat(cards); //Create color pairs
    cards.sort(() => Math.random() - .5); //Shuffle colors
}

const renderCards = () => {
    let markup = cards.map((card,index) => {
        return `<div class="card" id="card-${index}">
                    <div class="card__wrapper">
                        <div class="card__front"></div>
                        <div class="card__back" style="background-color:${card.color}"></div>
                    </div>
                </div>`
    }).join("") 
    gameField.innerHTML = markup;
}

createCards(START_AMOUNT);
renderCards(cards);