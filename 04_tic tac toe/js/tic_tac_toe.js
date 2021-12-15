"use strict";
// flag is true penguins ---  is false bear
let flag = true;
let counter = 9;

const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);

const a_1 = document.querySelector("#a_1");
const a_2 = document.querySelector("#a_2");
const a_3 = document.querySelector("#a_3");
const b_1 = document.querySelector("#b_1");
const b_2 = document.querySelector("#b_2");
const b_3 = document.querySelector("#b_3");
const c_1 = document.querySelector("#c_1");
const c_2 = document.querySelector("#c_2");
const c_3 = document.querySelector("#c_3");

const newgamebtn_display = document.querySelector("#newgame-btn");
const newgamebtn = document.querySelector("#btn90");

const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const msgtxt1 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px" alt=""></p><p>Peguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px" alt=""></p><p>WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px"></p><p class="animate__animated animate__lightSpeedInRight">Peguins Win!</p>';
const msgtxt4 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px"></p><p class="animate__animated animate__lightSpeedInLeft">WhiteBear Win!</p>';
const msgtxt5 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px"><img src="./img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__bounceIn">Draw!!</p>';

window.addEventListener("DOMContentLoaded", 
    function(){
        setMessage("pen-turn");
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

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
function isSelect(selectSquare){
    if(flag === true){
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        if(isWinner("penguins") === true){
            setMessage("pen-win");
            gameOver("penguins");
            return;
        }
        setMessage("bear-turn");
        flag = false;
    }else{
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        if(isWinner("bear") === true){
            setMessage("bear-win");
            gameOver("bear");
            return;
        }
        setMessage("pen-turn");
        flag = true;
    }

    counter--;
    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
    }
}

function setMessage(id){
    const node = document.querySelector("#msgtext");
    switch(id){
        case "pen-turn":
            node.innerHTML = msgtxt1;
            break;
        case "bear-turn":
            node.innerHTML = msgtxt2;
            break;
        case "pen-win":
            node.innerHTML = msgtxt3;
            break;
        case "bear-win":
            node.innerHTML = msgtxt4;
            break;
        case "draw":
            node.innerHTML = msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if(symbol === "penguins"){
                return square.classList.contains("js-pen-checked");
            }
            if(symbol === "bear"){
                return square.classList.contains("js-bear-checked");
            }
        });
        if(subResult){ winningLine = line}
        return subResult;
    });
    return result;
}

function gameOver(status) {
    squaresArray.forEach(function(square){
        square.classList.add("js-unclickable");
    });
    newgamebtn_display.classList.remove("js-hidden");
    if(status === "penguins"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-pen_highLight");
            });
        }
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }else if(status === "bear"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-bear_highLight");
            });
        }
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

//New game button 

newgamebtn.addEventListener("click",function(){
    flag = true;
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        setMessage("pen-turn");
        newgamebtn_display.classList.add("js-hidden");
        $(document).snowfall("clear");
    })
}, false);