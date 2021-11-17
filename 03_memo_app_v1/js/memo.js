"use strict";

document.addEventListener("DOMContentLoaded",
    function(){
        if(typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
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
                let w_confirm = confirm("LocalStorage" + key + " " + value + "を保存しました");
                if(w_confirm === true){
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorage" + key + " " + value + "を保存しました";
                    window.alert(w_msg);
                    document.querySelector("#textKey").value = "";
                    document.querySelector("#textMemo").value = "";
                }  
            }
    }, false
);
}; 

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

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    //JQuery plugin tablesorter
$("#table1").tablesorter({
    sortList: [[1,0]]
});
$("#table1").trigger("update");
}


//---------------------------------------------------------
function selectTable(){
    let select = document.querySelector("#select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectRadioBtn();
    },false);
}

function selectRadioBtn(){
    let w_sel = "0";
    var radio1 = document.getElementsByName("radio1");
    var table1 = document.querySelector("#table1");
    for(let i=0; i<radio1.length; i++){
        if(radio1[i].checked){
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }
    window.alert("select please");
}

function delLocalStorage(){
    document.querySelector("#del").addEventListener("click",
    function(e){
        e.preventDefault();
        let w_sel = "0";
        w_sel = selectRadioBtn();
        if(w_sel === "1"){
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            let w_confirm = confirm("LocalStorage" + key + " " + value + "を削除しました");
            if(w_confirm === true){
                localStorage.removeItem(key);
                viewStorage();
                let w_mgs = "LocalStorage" + key + " " + value + "を削除しました";
                window.alert(w_mgs);
                key.value = "";
                value.value = "";
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

