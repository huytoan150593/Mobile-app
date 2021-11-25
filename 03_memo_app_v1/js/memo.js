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

            console.log(key,value);

            if(key == "" || value == ""){
                window.alert("push something!!");
                return;
            }else {
                let w_confirm = confirm("LocalStorage " + key + " " + value + "を保存しました");
                if(w_confirm === true){
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorage " + key + " " + value + "を保存しました";
                    window.alert(w_msg);
                    document.querySelector("#textKey").value = "";
                    document.querySelector("#textMemo").value = "";
                }  
            }
    }, false
);
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
    //let w_sel = "0";
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
            // document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            // document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            // return w_sel = "1";
            w_cnt++;
        }
    }
    document.querySelector("#textKey").value = w_textKey;
    document.querySelector("#textMemo").value = w_textMemo;
    if(mode == "select"){
        if(w_cnt === 1){
            return w_cnt++;
        }else{
            window.alert("which one select please");
        } 
    }else if(mode == "del"){
        if(w_cnt >= 1){
            return w_cnt++;
        }else{
            window.alert("which one select please");
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
            let w_confirm = window.confirm("LocalStorage から選択されている" + w_cnt + "件を削除しましすか");
            if(w_confirm === true){
                for(let i=0; i < chkbox1.length; i++){
                    if(chkbox1[i].checked){
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                    }
                }
                viewStorage();
                let w_mgs = "LocalStorage から" + w_cnt + "件を削除しました";
                window.alert(w_mgs);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }  
        }
    },false);
}

function allClearLocalStorage(){
    const allClear = document.querySelector("#allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて削除します。.\nよろしですか？");
            if(w_confirm === true){
                localStorage.clear();
                viewStorage();
                window.alert("LocalStorageのデータをすべて削除 (all clear) しました。");
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";   
            }
        },false);
};

