'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ワニス在庫配列//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const varnishStock = [
  { stockPlace: "A1", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A2", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A3", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A4", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B1", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B2", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B3", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B4", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "C1", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "C2", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "C3", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "C4", arrivalDate: "", dueDate: "", line: "" },
];

//日付を今日のデータで開く/////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function getToday() {   //このWEBを開くと関数が実行
  document.getElementById("stockDate").value = new Date().toLocaleDateString('sv-SE')  //HTMLの日付を今日の日付に
}

// 入庫処理//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arrival(place, getDate, line) {
  // HTMLの<input type="date">から取得した文字列を日付型に変換
  const parsedDate = new Date(getDate);

  for (const object of varnishStock) {  //ワニス在庫のオブジェクト配列
    if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
      if (object.arrivalDate === "") {  //データがない時
        object.arrivalDate = parsedDate;  //オブジェクトの納入日を格納
        const dueDate = new Date(parsedDate);  //duedateに納入日を日付型で格納
        dueDate.setDate(parsedDate.getDate() + 30);  // 30日後の日付を計算
        object.dueDate = dueDate;  //オブジェクトの期限日を格納
        object.line = line;        //オブジェクトのライン名を格納
        //ここからHTMLへinner.text
        const elemArrivalDate = document.getElementById(`arrivalDate${place}`);  //入庫日のhtml入力先
        const arrivalInputDate = parsedDate.toLocaleDateString('sv-SE');  //日付型の変換
        elemArrivalDate.innerText = arrivalInputDate; //入庫日の入力
        const elemDueDate = document.getElementById(`dueDate${place}`);  //期限日のhtml入力先
        const dueInputDate = dueDate.toLocaleDateString('sv-SE'); //日付型の変換
        elemDueDate.innerText = dueInputDate;  //期限日の入力
        const elemLine = document.getElementById(`line${place}`);  //期限日のhtml入力先
        elemLine.innerText = line;  //期限日の入力
      } else {
        alert("その場所にはすでに入庫されています。今一度場所をご確認ください。");  //データがある時は入力できないのでアラート
      }
    }
  }
}

const button = document.getElementById("button1");
button.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = document.getElementById("myForm").elements.place.value; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "Line"; //フォーム追加後に変更


  arrival(place, getDate, line);  //入庫処理 arrival 関数を呼び出す
});


//使用処理////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function use(place, line) {
  for (const object of varnishStock) {  //ワニス在庫のオブジェクト配列
    if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
      if (object.arrivalDate !== "") {  //データがある時
        object.arrivalDate = "";  //オブジェクトの納入日を空
        object.dueDate = "";  //オブジェクトの期限日を空
        object.line = "";        //オブジェクトのライン名を空
        //ここからHTMLへinner.text
        const elemArrivalDate = document.getElementById(`arrivalDate${place}`);  //入庫日のhtml入力先
        elemArrivalDate.innerText = ""; //入庫日を空
        const elemDueDate = document.getElementById(`dueDate${place}`);  //期限日のhtml入力先
        elemDueDate.innerText = "";  //期限日を空
        const elemLine = document.getElementById(`line${place}`);  //期限日のhtml入力先
        elemLine.innerText = "";  //期限日を空
      } else {
        alert("その場所に使用できるものはありません。場所をご確認ください。");  //データがない時は使用できないのでアラート
      }
    }
  }
}

const useButton = document.getElementById("button2");
useButton.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = document.getElementById("myForm").elements.place.value; // フォームから場所を取得
  const line = "Line"; //フォーム追加後に変更
  use(place, line);  //使用処理 use 関数を呼び出す
});
