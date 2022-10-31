const result = {
    hit(el1,el2,t){
        engine.stateTemp[`${item1.id}`].status = "clear";
        engine.stateTemp[`${item2.id}`].status = "clear";
        setTimeout(() => {
        el1.classList.add("no-visible");
        el2.classList.add("no-visible");
        }, t)
        engine.tempUpdate();
        engine.moveCounter = 0;
        engine.chosenCard = [];
        engine.checkWin();
    },
    miss(el1,el2,t) {
        engine.stateTemp[`${item1.id}`].status = "back";
        engine.stateTemp[`${item2.id}`].status = "back";  
        setTimeout(() => {
            el1.classList.toggle("flip");
            el1.firstElementChild.classList.toggle("flip");
            el2.classList.toggle("flip");
            el2.firstElementChild.classList.toggle("flip");
        },t)
        engine.tempUpdate();
        engine.moveCounter = 0;
        engine.chosenCard = [];    
    }
}

engine.gameBox.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("card") && engine.chosenCard.length < 2) {
        e.target.classList.toggle("flip");
        e.target.firstElementChild.classList.toggle("flip");
        engine.chosenCard.push({ id: `#${e.target.id}`, bgCol: e.target.getAttribute("data-color") });
        engine.moveCounter++;
        engine.stateTemp[`${e.target.id}`].status = "front";
        engine.tempUpdate();
 
        if (engine.moveCounter === 2) {
            item1 = document.querySelector(engine.chosenCard[0].id);
            item2 = document.querySelector(engine.chosenCard[1].id);
            if (engine.chosenCard[0].bgCol === engine.chosenCard[1].bgCol && engine.chosenCard[0].id !== engine.chosenCard[1].id) {
                result.hit(item1, item2, 1200);
            } else {
                result.miss(item1, item2, 1200);
            }
        }
    }
    
})
