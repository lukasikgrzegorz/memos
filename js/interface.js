const interface = {
    startScreen: document.querySelector("[js-start-screen]"),
    newBtn: document.querySelector("[js-start-new]"),
    quickBtn: document.querySelector("[js-start-quick]"),
    continueBtn: document.querySelector("[js-continue-game]"),
    
    checkTemp() {
        localStorage.getItem("gameParams") ? this.continueBtn.removeAttribute("disabled") : "";
    }
}

interface.checkTemp();

interface.newBtn.addEventListener('click', ()=> {
    interface.startScreen.classList.add("no-display"); 
    engine.newGame(false);
})

interface.quickBtn.addEventListener('click', () => {
    interface.startScreen.classList.add("no-display");  
    engine.newGame(true);
})

interface.continueBtn.addEventListener('click', ()=> {
    interface.startScreen.classList.add("no-display"); 
    engine.continueGame();
})
