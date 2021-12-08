"use strict";
// flag is true penguins ---  is false bear
let flag = true;
let counter = 9;

const a_1 = document.querySelector("#a_1");
const a_2 = document.querySelector("#a_2");
const a_3 = document.querySelector("#a_3");
const b_1 = document.querySelector("#b_1");
const b_2 = document.querySelector("#b_2");
const b_3 = document.querySelector("#b_3");
const c_1 = document.querySelector("#c_1");
const c_2 = document.querySelector("#c_2");
const c_3 = document.querySelector("#c_3");

const mgstxt1 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px" alt=""></p><p>Peguins Attack!</p>';
const mgstxt2 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px" alt=""></p><p>WhiteBear Attack!</p>';
const mgstxt3 = '<p>DRAW</p>'

window.addEventListener("DOMContentLoaded", 
    function(){
        // setMessage("pen-turn");
    }, false);

a_1.addEventListener("click", () => {
    isSelect(a_1);
});
a_2.addEventListener("click", () => {
    isSelect(a_2);
});
a_3.addEventListener("click", () => {
    isSelect(a_3);
});
b_1.addEventListener("click", () => {
    isSelect(b_1);
});
b_2.addEventListener("click", () => {
    isSelect(b_2);
});
b_3.addEventListener("click", () => {
    isSelect(b_3);
});
c_1.addEventListener("click", () => {
    isSelect(c_1);
});
c_2.addEventListener("click", () => {
    isSelect(c_2);
});
c_3.addEventListener("click", () => {
    isSelect(c_3);
});


function isSelect(selectSquare){
    if(flag === true){
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        setMessage("bear-turn");
        flag = false;
    }else{
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        setMessage("pen-turn");
        flag = true;
    }

    counter--;
    if(counter === 0){
        setMessage("draw");
    }
}

function setMessage(id){
    const node = document.querySelector("#msgtext");
    switch(id){
        case "pen-turn":
            node.innerHTML -= mgstxt2;
            node.innerHTML += mgstxt1;
            break;
        case "bear-turn":
            node.innerHTML -= mgstxt1;
            node.innerHTML += mgstxt2;
            break;
        case "draw":
            node.innerHTML -= mgstxt1;
            node.innerHTML += mgstxt3;
        default:
            break;
    }
}