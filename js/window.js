window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if(window.innerWidth < window.innerHeight){
        refs.gameBox.classList.remove("gamebox--vmin"); 
        refs.gameBox.classList.add("gamebox--vmax");   
    } else {
        refs.gameBox.classList.remove("gamebox--vmax"); 
        refs.gameBox.classList.add("gamebox--vmin");      
    }
});

//Fix mobile browsers display
(() => {
    let vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
    if (window.innerWidth > window.innerHeight) {
    refs.gameBox.classList.add("gamebox--vmin");
    } else {
        refs.gameBox.classList.add("gamebox--vmax");
    }
})();