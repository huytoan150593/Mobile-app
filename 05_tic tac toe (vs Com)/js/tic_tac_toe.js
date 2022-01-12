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

const levels = document.querySelectorAll(".level");
const levelsArray = Array.from(levels);
const level_1 = document.querySelector("#level_1");
const level_2 = document.querySelector("#level_2");
const level_3 = document.querySelector("#level_3");

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

const lineRandom = cornerLine(squaresArray, ["a_1","a_3","c_1","c_3"]);

let winningLine = null;

const msgtxt1 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px" alt=""></p><p>Peguins Attack!(Your Turn)</p>';
const msgtxt2 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px" alt=""></p><p>WhiteBear Attack!(Computer Turn)</p>';
const msgtxt3 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px"></p><p class="animate__animated animate__lightSpeedInRight">Peguins Win!</p>';
const msgtxt4 = '<p class="image"><img src="./img/whitebear.jpg" width="61px" height="61px"></p><p class="animate__animated animate__lightSpeedInLeft">WhiteBear Win!</p>';
const msgtxt5 = '<p class="image"><img src="./img/penguins.jpg" width="61px" height="61px"><img src="./img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__bounceIn">Draw!!</p>';

let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded", 
    function(){
        setMessage("pen-turn");
        squaresArray.forEach((square) => square.classList.add("js-clickable"));
        LevelSetting(0);    
    }, false);

// Set Level
let index;
levelsArray.forEach(level => {
    level.addEventListener("click", () => {
        index = [].slice.call(levelsArray).indexOf(level);
        console.log(index);
        LevelSetting(index);
    });
})

function LevelSetting(index){
    levelsArray.forEach(level => {
        level.classList.remove("level-selected");
        level.classList.remove("level-non-selected");
    })

    if(sessionStorage.getItem("tic_tac_toe_access")){
        switch(index){
            case 0:
                sessionStorage.setItem("tic_tac_toe_access", "1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access", "2");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 2:
                sessionStorage.setItem("tic_tac_toe_access", "3");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-selected");
                break;
            default:
                sessionStorage.setItem("tic_tac_toe_access", "1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
        }
    }else{
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
    }
}
// ---------------------------------------------------------------------
squaresArray.forEach(function(square){
    square.addEventListener('click', () => {
        if(counter === 9){
            const levelBox = document.querySelector("#levelBox");
            levelBox.classList.add("js-unclickable");
        }
        let gameOverFlg = isSelect(square);
        if(gameOverFlg === "0"){
            let squaresBox = document.querySelector("#squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    bearTurn();
                }, 
                "1000"
            );
        }
    })
});

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
function cornerLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3]);
    });
}
function isSelect(selectSquare){
    let gameOverFlg;
    if(flag === true){
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        if(isWinner("penguins") === true){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = false;
    }else{
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        if(isWinner("bear") === true){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = true;
    }

    counter--;
    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
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
    let w_sound;
    switch(status){
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break; 
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    squaresBox.classList.add("js-unclickable");
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
        square.classList.add("js-clickable");
    });
    squaresBox.classList.remove("js-unclickable");
    levelBox.classList.remove("js-unclickable");
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
    $(document).snowfall("clear");
}, false); 

function bearTurn(){
    let level = sessionStorage.getItem("tic_tac_toe_access");
    let bearTurnEnd = "0";
    let gameOverFlg = "0";
    while(bearTurnEnd === "0"){
        if(level === "1" || level === "2" || level === "3"){
            bearTurnEnd = isReach("bear");
            if(bearTurnEnd === "1"){
                gameOverFlg = "1";
                break;
            }
        }
        
        if(level === "2" || level === "3"){
            bearTurnEnd = isReach("penguins");
            if(bearTurnEnd === "1") break;
        }

        if(level === "2" || level === "3"){
            if(b_2.classList.contains("js-clickable")){
                gameOverFlg = isSelect(b_2);
                bearTurnEnd = "1";
                break;
            }
        }
        if(level === "3"){
            lineArray.some(line => {
                const check = line.every(square => {
                    return !square.classList.contains("js-pen-checked");
                })
                if(check){
                    for(let square of line){
                        if(square.classList.contains("js-clickable")){
                            gameOverFlg = isSelect(square);
                            bearTurnEnd = "1";
                            break;
                        }
                    }
                }
                return check;
            })
            if(bearTurnEnd === "1") break;
        }
        if(level === "3"){
            for(let square of lineRandom){
                if(square.classList.contains("js-clickable")){
                    gameOverFlg = isSelect(square);
                    bearTurnEnd = "1";
                    break;
                }
            }
            if(bearTurnEnd === "1") break;
        }
        const bearSquare = squaresArray.filter((square) => square.classList.contains("js-clickable"));
        let n = Math.floor(Math.random() * bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);
        break;
    }

    if(gameOverFlg === "0"){
        document.querySelector("#squaresBox").classList.remove("js-unclickable"); 
    }
}

function isReach(status){
    let bearTurnEnd = "0";
    lineArray.some(line => {
        let bearCheckCnt = 0;
        let penCheckCnt = 0;

        line.forEach(square => {
            if(square.classList.contains("js-bear-checked")) bearCheckCnt++;
            if(square.classList.contains("js-pen-checked")) penCheckCnt++;
        });

        if(status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0){
            bearTurnEnd = "1";
        }
        if(status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2){
            bearTurnEnd = "1";
        }
        // Select square to Win
        if(bearTurnEnd === "1"){
            line.some(square => {
                if(square.classList.contains("js-clickable")){
                    isSelect(square);
                }
            })
            return true
        }
    })
    return bearTurnEnd;
}