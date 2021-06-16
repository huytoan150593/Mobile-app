"use strict";

window.addEventListener("DOMContentLoaded",
    function(){
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
            effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
            delayScale: 1.5, // 遅延時間の指数
            delay: 50, // 文字ごとの遅延時間
            sync: false, // trueはアニメーションをすべての文字に同時に適用
            shuffle: true // trueは文字を順番にではなく、ランダムに
            }
            });
            // おみくじボタン(id="btn1") ボヤァと表示させる
            $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
            });
    }
)
window.addEventListener("DOMContentLoaded",
    function(){
        let popMessage = "いらっしゃい！おみくじ引いてって";
        window.alert(popMessage);
    }, false

);

const btn = document.getElementById("btn");
btn.addEventListener("click",
    function(){
        let resultText = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉!", "凶。。",];
        let resultColor = ["#ff0000", "#c71585", "#ff1493", "#ff69b4", "#ff8c00", "#1e90ff"];
        let resultFontSize = ["55px", "50px", "45px", "40px", "35px", "30px"];
        let n = Math.floor(Math.random() * resultText.length);

        btn.textContent = resultText[n];
        btn.style.color = resultColor[n];
        btn.style.fontSize = resultFontSize[n];

            // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        $(document).ready(function(){
        $(document).snowfall({
        maxSpeed : 5, // 最大速度
        minSpeed : 1, // 最小速度
        maxSize : 20, // 最大サイズ
        minSize : 1, // 最小サイズ
        image : 'images/sakura_hanabira.png'
        });
        });
        
    }, false
);

