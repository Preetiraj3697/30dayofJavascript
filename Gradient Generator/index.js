let colorOne =document.getElementById('color-a');
let colorTwo = document.getElementById('color-b');
let currentDirection = 'to bottom';
let outputCode = document.getElementById('code');

function setDirection(value,_this){
    let directions = document.querySelectorAll(".buttons button");
    // console.log(directions) 
    for(let i of directions){
        i.classList.remove('active');
    }
    _this.classList.add('active');
    currentDirection =value;
    console.log(currentDirection);
}
function generateCode(){
  outputCode.value = `background-image:linear-gradient(${currentDirection},${colorOne.value},
    ${colorTwo.value});`

    document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection}
        ,${colorOne.value},${colorTwo.value})`;
}
function copyText(){
    outputCode.select();
    document.execCommand('copy');
    alert('Gradient Copied!');
}
generateCode();
/* 

background-image:linear-gradient(to bottom,#c0cc14,
    #2bb13a);
    background-image:linear-gradient(to bottom left,#33cc14,
    #2b4cb1);
 */