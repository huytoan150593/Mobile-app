"use strict";

window.addEventListener("DOMContentLoaded",
    function(){
        let popMessage = "いらっしゃい！おみくじ引いてって";
        window.alert(popMessage);
    }, false

);

const btn = document.getElementById("btn");
btn.addEventListener("click",
    function(){
        let n = Math.floor(Math.random() * 3);

        switch(n){
            case 0:
                btn.innerText = "Very Happy!!";
                btn.style.color = "#ff0000";
                btn.style.fontSize = "40px";
                break;
            case 1:
                btn.innerText = "Happy!!";
                btn.style.color = "#fff001";
                btn.style.fontSize = "30px";
                break;
            case 2:
                btn.innerText = "UnHappy...";
                btn.style.color = "#261e1c";
                btn.style.fontSize = "20px";
                break;
        }
    }, false
);