window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if(window.innerWidth < window.innerHeight){
        engine.gameBox.classList.remove("gamebox--vmin"); 
        engine.gameBox.classList.add("gamebox--vmax");   
    } else {
        engine.gameBox.classList.remove("gamebox--vmax"); 
        engine.gameBox.classList.add("gamebox--vmin");      
    }
});

//Fix mobile browsers display
(() => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if (window.innerWidth > window.innerHeight) {
    engine.gameBox.classList.add("gamebox--vmin");
    } else {
        engine.gameBox.classList.add("gamebox--vmax");
    }
})();