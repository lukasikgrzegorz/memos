window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if(window.innerWidth < window.innerHeight){
        gameField .classList.remove("gamebox--vmin"); 
        gameField .classList.add("gamebox--vmax");   
    } else {
        gameField .classList.remove("gamebox--vmax"); 
        gameField .classList.add("gamebox--vmin");      
    }
});

//Fix mobile browsers display
(() => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if (window.innerWidth > window.innerHeight) {
    gameField.classList.add("gamebox--vmin");
    } else {
        gameField.classList.add("gamebox--vmax");
    }
})();