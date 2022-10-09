let bodyBtn = document.getElementById("body-btn");
let mainWingBtn = document.getElementById("main-wing-btn");
let subWingBtn = document.getElementById("sub-wing-btn");
let upperBeakBtn = document.getElementById("upper-beak-btn");
let lowerBeakBtn = document.getElementById("lower-beak-btn");
let clawBtn = document.getElementById("claw-btn");
let tailWingBtn = document.getElementById("tail-wing-btn");
let headWingBtn = document.getElementById("head-wing-btn");
let eyePatchBtn = document.getElementById("eye-patch-btn");
let eyeBtn = document.getElementById("eye-btn");

let colors = [
  "#cd0000",
  "#f03800",
  "#ffb64c",
  "#ff9100",
  "#0095ff",
  "#1fbf66",
  "#ff4380",
  "#deecf1",
  "#714c2f",
  "#7fe881",
  "#f7006a",
];

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
let counter5 = 0;
let counter6 = 0;
let counter7 = 0;
let counter8 = 0;
let counter9 = 0;
let counter10 = 0;

function setCounterValue(counter) {
  return counter < colors.length - 1 ? counter + 1 : 0;
}

bodyBtn.addEventListener("click", () => {
  document.querySelectorAll(".body-clr").forEach((item) => {
    item.style.backgroundColor = colors[counter1];
  });
  document.querySelector(".wing-color2-inner").style.borderTopColor =
    colors[counter1];
  counter1 = setCounterValue(counter1);
});
mainWingBtn.addEventListener("click", () => {
  document.querySelector(".wing-color1").style.backgroundColor =
    colors[counter2];
  counter2 = setCounterValue(counter2);
});
subWingBtn.addEventListener("click", () => {
  document.querySelector(".wing-color2").style.borderTopColor =
    colors[counter3];
  counter3 = setCounterValue(counter3);
});
upperBeakBtn.addEventListener("click", () => {
  document.querySelector(".beak-upper").style.backgroundColor =
    colors[counter4];
  counter4 = setCounterValue(counter4);
});
lowerBeakBtn.addEventListener("click", () => {
  document.querySelector(".beak-lower").style.backgroundColor =
    colors[counter5];
  counter5 = setCounterValue(counter5);
});
clawBtn.addEventListener("click", () => {
  document.querySelector(".leg").style.backgroundColor = colors[counter6];
  counter6 = setCounterValue(counter6);
});
tailWingBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".tail-wing")
    .forEach((item) => (item.style.backgroundColor = colors[counter7]));
  counter7 = setCounterValue(counter7);
});
headWingBtn.addEventListener("click", () => {
  document.querySelector(".feather").style.backgroundColor = colors[counter8];
  counter8 = setCounterValue(counter8);
});
eyePatchBtn.addEventListener("click", () => {
  document.querySelector(".eye-patch").style.backgroundColor = colors[counter9];
  counter9 = setCounterValue(counter9);
});
eyeBtn.addEventListener("click", () => {
  document.querySelector(".eye").style.backgroundColor = colors[counter10];
  counter10 = setCounterValue(counter10);
});