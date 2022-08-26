const colorBtn = document.querySelector('#btn-1');
const boxes = document.querySelectorAll('.box');

let running =false;
function getRandomColor(){
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function start(){
    if(running){
        boxes.forEach(color =>{
            color.style.background = getRandomColor();
        });
        setTimeout(start,500);
    }
}

colorBtn.addEventListener('click',function(){
    colorBtn.innerText = "STOP";
    if(running){
        running=false;
        colorBtn.innerText = "CHANGE COLOR";
    }else{
        running= true;
        start();
    }
})