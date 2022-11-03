const interface = {
    startBtn: document.querySelector("[js-start-game]"),
    startScreen: document.querySelector("[js-start-screen]"),
    continueBtn: document.querySelector("[js-continue-game]"),
    arcadeBtn: document.querySelector("[js-start-arcade]")
}

interface.startBtn.addEventListener('click', () => {
    interface.startScreen.classList.add("no-display");  
    engine.newGame();
})

interface.continueBtn.addEventListener('click', ()=> {
    interface.startScreen.classList.add("no-display"); 
    engine.continueGame();
})

interface.arcadeBtn.addEventListener('click', ()=> {
    interface.startScreen.classList.add("no-display"); 
    engine.arcade(true);
})