'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ワニス在庫配列
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

// 入庫処理
function arrival(place, getDate, line) {
  console.log(place);
  // HTMLの<input type="date">から取得した文字列を日付型に変換
  const parsedDate = new Date(getDate);

  for (const object of varnishStock) {  //ワニス在庫のオブジェクト配列
    if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
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
    }
  }
}

const button = document.getElementById("button");
button.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = document.getElementById("myForm").elements.place.value; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "Line"; //フォーム追加後に変更

  
  arrival(place, getDate, line);  //入庫処理 arrival 関数を呼び出す
});
