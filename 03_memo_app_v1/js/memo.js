"use strict";

document.addEventListener("DOMContentLoaded",
    function(){
        if(typeof localStorage === "undefined"){
            window.alert("このブラウザは Local Storage 機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage(); 
            selectTable(); 
        }
}, false
);

// Save LocalStorage
function saveLocalStorage(){
    document.querySelector("#save").addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.querySelector("#textKey").value;
            const value = document.querySelector("#textMemo").value;

            if(key == "" || value == ""){
                Swal.fire({
                    title: "Memo app",
                    html: "1件はいずれも必須です。",
                    type: "error",
                    allowOutsideClick: false
                });
                return;
            }else {
                let w_msg = "LocalStorage \n" + key + " " + value + "\nを保存しますか。";
                Swal.fire({
                    title: "Memo app",
                    html: w_msg,
                    type: "question",
                    showCancelButton: true
                }).then(function(result){
                    if(result.value === true){
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorage に " + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.querySelector("#textKey").value = "";
                        document.querySelector("#textMemo").value = "";
                    }
                });
            }
    }, false);
}; 

//---------------------------------------------------------
function selectTable(){
    let select = document.querySelector("#select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox("select");
    },false);
}

function selectCheckBox(mode){
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.querySelector("#table1");
    let w_textKey = "";
    let w_textMemo = "";
    for(let i=0; i<chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.querySelector("#textKey").value = w_textKey;
    document.querySelector("#textMemo").value = w_textMemo;
    if(mode == "select"){
        if(w_cnt === 1){
            return w_cnt++;
        }else{
            Swal.fire({
                title: "Memo app",
                html: "１件はいずれも必須です。",
                type: "error",
                allowOutsideClick: false
            });
        } 
    }else if(mode == "del"){
        if(w_cnt >= 1){
            return w_cnt++;
        }else{
            Swal.fire({
                title: "Memo app",
                html: "１件はいずれも必須です。",
                type: "error",
                allowOutsideClick: false
            });
        }
    }
}

function viewStorage() {
    const list = document.querySelector("#list");
    while(list.rows[0]) list.deleteRow(0);
    for( let i=0; i<localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    //JQuery plugin tablesorter
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("#table1").trigger("update");
}

function delLocalStorage(){
    const del = document.querySelector("#del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt = 0;
        w_cnt = selectCheckBox("del");
        if(w_cnt >= "1"){
            let w_msg = "LocalStorage から選択されている " + w_cnt + " 件を削除しますか";
            Swal.fire({
                title: "Memo app",
                html: w_msg,
                type: "question",
                showCancelButton: true
            }).then(function(result){
                if(result.value === true) {
                    for(let i=0; i < chkbox1.length; i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                    }
                    viewStorage();
                    let w_msg = "LocalStorage から " + w_cnt + " 件を削除しました";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    })
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    },false);
}

function allClearLocalStorage(){
    const allClear = document.querySelector("#allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除します。よろしいですか？";
            Swal.fire({
                title: "Memo app",
                html: w_msg,
                type: "question",
                showCancelButton: true
            }).then(function(result){
                if(result.value == true){
                    localStorage.clear();
                    viewStorage();
                    Swal.fire({
                        title: "Memo app",
                        html: "LocalStorageのデータをすべて削除しました。",
                        type: "success",
                        allowOutsideClick: false
                    })
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
        },false);
};