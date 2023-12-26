'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ワニス在庫配列//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let varnishStock = [
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

//高粘度ワニス在庫配列//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let highViscosityVarnishStockP710 = [
  { stockPlace: "A1", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A2", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A3", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "A4", arrivalDate: "", dueDate: "", line: "" },
];

let highViscosityVarnishStockP810 = [
  { stockPlace: "B1", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B2", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B3", arrivalDate: "", dueDate: "", line: "" },
  { stockPlace: "B4", arrivalDate: "", dueDate: "", line: "" },
];

//日付を今日のデータで開く/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  document.getElementById("stockDate").value = new Date().toLocaleDateString('sv-SE');  //HTMLの日付を今日の日付に
})

//ページを開いたときに入出庫場所表示実行//////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", updateStockInfocata);  //触媒在庫数

//触媒P710配列////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let catalystStockDateP710 = [];    //入庫日
let catalystStockDueDateP710 = [];    //期限日
let inventoryCountP710 = 0;    //在庫数

//触媒P810配列////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let catalystStockDateP810 = [];    //入庫日
let catalystStockDueDateP810 = [];    //期限日
let inventoryCountP810 = 0;    //在庫数

//触媒入庫P710///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arrivalCatlystP710(getday) {
  if (catalystStockDateP710.length < 16) {  //MAX在庫数15
    backData();  //１つ前のデータを保存
    const parsedDay = new Date(getday);  //日付型に変更
    catalystStockDateP710.push(parsedDay);  //配列に格納
    const dueDate = new Date(parsedDay);  //duedateに納入日を日付型で格納
    dueDate.setDate(parsedDay.getDate() + 30);  // 30日後の日付を計算
    catalystStockDueDateP710.push(dueDate);  //配列に格納
    itemInSound(); //効果音
  } else {
    alertSound();  //警告音
    alert("在庫がいっぱいです！")
  }
  inventoryCountP710 = catalystStockDateP710.length;
  updateStockInfocata();  //触媒在庫数更新
  saveData();  //データ保存
}

//触媒出庫P710///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function shippingCatlystP710() {
  if (catalystStockDateP710.length > 0) {
    backData();  //１つ前のデータを保存
    catalystStockDateP710.shift();  //配列に格納
    catalystStockDueDateP710.shift();  //配列に格納
    itemOutSound();  //効果音
  } else {
    alertSound();  //警告音
    alert("在庫がありません")
  }
  inventoryCountP710 = catalystStockDateP710.length;
  itemOutSound();  //効果音
  updateStockInfocata();  //触媒在庫数更新
  saveData();  //データ保存
  clearTimeout(buttonATimer);  //入れ忘れ防止タイマーキャンセル
}

//触媒入庫P810///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arrivalCatlystP810(getday) {
  if (catalystStockDateP810.length < 16) {  //MAX在庫数15
    backData();  //１つ前のデータを保存
    const parsedDay = new Date(getday);  //日付型に変更
    catalystStockDateP810.push(parsedDay);  //配列に格納
    const dueDate = new Date(parsedDay);  //duedateに納入日を日付型で格納
    dueDate.setDate(parsedDay.getDate() + 30);  // 30日後の日付を計算
    catalystStockDueDateP810.push(dueDate);  //配列に格納
    itemInSound(); //効果音
  } else {
    alertSound();  //警告音
    alert("在庫がいっぱいです！")
  }
  inventoryCountP810 = catalystStockDateP810.length;
  updateStockInfocata();  //触媒在庫数更新
  saveData();  //データ保存
}

//触媒出庫P810///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function shippingCatlystP810() {
  if (catalystStockDateP810.length > 0) {
    backData();  //１つ前のデータを保存
    catalystStockDateP810.shift();  //配列に格納
    catalystStockDueDateP810.shift();  //配列に格納
  } else {
    alertSound();  //警告音
    alert("在庫がありませんねん")
  }
  inventoryCountP810 = catalystStockDateP810.length;
  itemOutSound();  //効果音
  updateStockInfocata();  //触媒在庫数更新
  saveData();  //データ保存
  clearTimeout(buttonBTimer);  //入れ忘れ防止タイマーキャンセル
}

//触媒在庫情報更新//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateStockInfocata() {
  const cataInventoryP7 = document.getElementById("cataP710");
  const cataInventoryP8 = document.getElementById("cataP810");
  cataInventoryP7.innerText = inventoryCountP710;
  cataInventoryP8.innerText = inventoryCountP810;
}

//ワニス在庫数///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let varnishStockCountP7 = 0; //P7ワニス在庫数
let varnishStockCountP8 = 0; //P8ワニス在庫数

function varnishStockCount() {
  varnishStockCountP7 = 0;  //カウンタリセット
  varnishStockCountP8 = 0;  //カウンタリセット

  for (let i = 0; i < varnishStock.length; i++) {
    if (varnishStock[i].line === "P710") {
      varnishStockCountP7 += 1;
    }
    else if (varnishStock[i].line === "P810") {
      varnishStockCountP8 += 1;
    }
  }
}

//ワニス使用後触媒使用ボタン押さなきゃ警告///////////////////////////////////////////////////////////////////////////////////////////////
let buttonATimer;
let buttonBTimer;

function alertP7() {
  alermSound();
  window.open("AlermP7.html", null, 'width=740,height=460,toolbar=no,menubar=no,scrollbars=no');
  clearTimeout(buttonATimer);
}

function alertP8() {
  alermSound();
  window.open("AlermP8.html", null, 'width=740,height=460,toolbar=no,menubar=no,scrollbars=no');
  clearTimeout(buttonBTimer);
};
//ワニス番地表示/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inVarnishPlaceNumber() {
  const firstVarnishP710 = varnishStock[firstVarnishElementP710].stockPlace;  //P7使用優先
  const firstVarnishP810 = varnishStock[firstVarnishElementP810].stockPlace;  //P8使用優先
  const priorityPlace = varnishStock[priorityPlaceVarnishElement].stockPlace; //入庫優先場所
  const priPlace = document.getElementById("varnish");
  const firPlaceP7 = document.getElementById("varnishP7");
  const firPlaceP8 = document.getElementById("varnishP8");
  priPlace.innerText = priorityPlace;
  if (varnishStock[1].line === "P710" && firstVarnishP710 === "A1") {
    firPlaceP7.innerText = firstVarnishP710;
  }
  else {
    firPlaceP7.innerText = "---";
  }
  if (varnishStock[1].line === "P810" && firstVarnishP810 === "A1") {
    firPlaceP8.innerText = firstVarnishP810;
  }
  else {
    firPlaceP8.innerText = "---";
  }
}

//高粘度ワニス番地表示/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inHighVarnishPlaceNumber() {
  const firstVarnishP710 = highViscosityVarnishStockP710[firstHighVisVarnishElementP710].stockPlace;  //P7使用優先
  const firstVarnishP810 = highViscosityVarnishStockP810[firstHighVisVarnishElementP810].stockPlace;  //P8使用優先
  const priorityPlaceP710 = highViscosityVarnishStockP710[priorityPlaceHighVisVarnishElementP710].stockPlace; //入庫優先場所
  const priorityPlaceP810 = highViscosityVarnishStockP810[priorityPlaceHighVisVarnishElementP810].stockPlace; //入庫優先場所
  const priPlaceP7 = document.getElementById("inHighVarnishP7");
  const priPlaceP8 = document.getElementById("inHighVarnishP8");
  const firPlaceP7 = document.getElementById("highVarnishP7");
  const firPlaceP8 = document.getElementById("highVarnishP8");
  priPlaceP7.innerText = priorityPlaceP710;
  priPlaceP8.innerText = priorityPlaceP810;
  if (priorityPlaceP710 === firstVarnishP710) {
    firPlaceP7.innerText = "---";
  }
  else {
    firPlaceP7.innerText = firstVarnishP710;
  }

  if (priorityPlaceP810 === firstVarnishP810) {
    firPlaceP8.innerText = "---";
  }
  else {
    firPlaceP8.innerText = firstVarnishP810;
  }

}

//ワニス在庫情報更新///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateStockInfoVarnish() {
  for (const object of varnishStock) {
    const subjectPlace = object.stockPlace;  //オブジェクトの場所を
    const subjectDuedate = new Date(object.dueDate);  //オブジェクトの期限日を格納
    const subjectLine = object.line;  //オブジェクトのラインを格納
    const priorityPlace = varnishStock[priorityPlaceVarnishElement].stockPlace; //入庫優先場所
    const firstVarnishP710 = varnishStock[firstVarnishElementP710].stockPlace;  //P7使用優先
    const firstVarnishP810 = varnishStock[firstVarnishElementP810].stockPlace;  //P8使用優先

    //期限日の処理
    const subjectElement = document.getElementById(`varnishDueDate${subjectPlace}`);  //期限日のhtml入力先
    const dueInputDate = subjectDuedate.toLocaleDateString('sv-SE'); //日付型の変換
    const imageElement = document.getElementById(`varnishImage${subjectPlace}`) //写真の変更先
    const priPlace = document.getElementById("varnish");
    const firPlaceP7 = document.getElementById("varnishP7");
    const firPlaceP8 = document.getElementById("varnishP8");

    if (dueInputDate === "Invalid Date" && priorityPlace === subjectPlace) {
      subjectElement.innerText = "";
      priPlace.innerText = priorityPlace;
      imageElement.src = "indication1.jpg"; //
    }
    else if (dueInputDate === "Invalid Date" && priorityPlace !== subjectPlace) {
      subjectElement.innerText = "";
      imageElement.src = "indication2.jpg"; //)
    }
    else if (subjectLine === "P710" && firstVarnishP710 !== subjectPlace) {
      subjectElement.innerText = dueInputDate;
      imageElement.src = "varnish2.jpg";
    }
    else if (subjectLine === "P810" && firstVarnishP810 !== subjectPlace) {
      subjectElement.innerText = dueInputDate;
      imageElement.src = "varnish1.jpg";
    }
    else if (subjectLine === "P710" && firstVarnishP710 === subjectPlace) {
      firPlaceP7.innerText = firstVarnishP710;
      subjectElement.innerText = dueInputDate;
      imageElement.src = "varnish4.jpg";
    }
    else if (subjectLine === "P810" && firstVarnishP810 === subjectPlace) {
      firPlaceP8.innerText = firstVarnishP810;
      subjectElement.innerText = dueInputDate;
      imageElement.src = "varnish3.jpg";
    }
  }
}

//高粘度ワニス在庫情報更新///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateStockInfoHighVarnish() {
  for (const object of highViscosityVarnishStockP710) {
    const subjectPlace = object.stockPlace;  //オブジェクトの場所を
    const subjectDuedate = new Date(object.dueDate);  //オブジェクトの期限日を格納
    const subjectLine = object.line;  //オブジェクトのラインを格納
    const priorityPlace = highViscosityVarnishStockP710[priorityPlaceHighVisVarnishElementP710].stockPlace; //入庫優先場所
    const firstVarnishP710 = highViscosityVarnishStockP710[firstHighVisVarnishElementP710].stockPlace;  //P7使用優先

    //期限日の処理
    const subjectElement = document.getElementById(`highVarnishDueDate${subjectPlace}`);  //期限日のhtml入力先
    const dueInputDate = subjectDuedate.toLocaleDateString('sv-SE'); //日付型の変換
    const imageElement = document.getElementById(`highVarnishImage${subjectPlace}`) //写真の変更先
    const priPlaceP7 = document.getElementById("inHighVarnishP7");
    const firPlaceP7 = document.getElementById("highVarnishP7");


    if (dueInputDate === "Invalid Date" && priorityPlace === subjectPlace) {
      priPlaceP7.innerText = priorityPlace;
      subjectElement.innerText = "";
      imageElement.src = "indication1.jpg"; //
    }
    else if (dueInputDate === "Invalid Date" && priorityPlace !== subjectPlace) {
      subjectElement.innerText = "";
      imageElement.src = "indication2.jpg"; //)
    }
    else if (subjectLine === "P710" && firstVarnishP710 !== subjectPlace) {
      subjectElement.innerText = dueInputDate;
      imageElement.src = "highvarnish2.jpg";
    }
    else if (subjectLine === "P710" && firstVarnishP710 === subjectPlace) {
      firPlaceP7.innerText = firstVarnishP710;
      subjectElement.innerText = dueInputDate;
      imageElement.src = "highvarnish4.jpg";
    }
  }
  for (const object of highViscosityVarnishStockP810) {
    const subjectPlace = object.stockPlace;  //オブジェクトの場所を
    const subjectDuedate = new Date(object.dueDate);  //オブジェクトの期限日を格納
    const subjectLine = object.line;  //オブジェクトのラインを格納
    const priorityPlace = highViscosityVarnishStockP810[priorityPlaceHighVisVarnishElementP810].stockPlace; //入庫優先場所
    const firstVarnishP810 = highViscosityVarnishStockP810[firstHighVisVarnishElementP810].stockPlace;  //P7使用優先

    //期限日の処理
    const subjectElement = document.getElementById(`highVarnishDueDate${subjectPlace}`);  //期限日のhtml入力先
    const dueInputDate = subjectDuedate.toLocaleDateString('sv-SE'); //日付型の変換
    const imageElement = document.getElementById(`highVarnishImage${subjectPlace}`) //写真の変更先
    const firPlaceP8 = document.getElementById("highVarnishP8");
    const priPlaceP8 = document.getElementById("inHighVarnishP8");

    if (dueInputDate === "Invalid Date" && priorityPlace === subjectPlace) {
      priPlaceP8.innerText = priorityPlace;
      subjectElement.innerText = "";
      imageElement.src = "indication1.jpg"; //
    }
    else if (dueInputDate === "Invalid Date" && priorityPlace !== subjectPlace) {
      subjectElement.innerText = "";
      imageElement.src = "indication2.jpg"; //)
    }
    else if (subjectLine === "P810" && firstVarnishP810 !== subjectPlace) {
      subjectElement.innerText = dueInputDate;
      imageElement.src = "highvarnish1.jpg";
    }
    else if (subjectLine === "P810" && firstVarnishP810 === subjectPlace) {
      firPlaceP8.innerText = firstVarnishP810;
      subjectElement.innerText = dueInputDate;
      imageElement.src = "highvarnish3.jpg";
    }
  }
}

// ワニス入庫処理//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arrivalVanish(place, getDate, line) {
  backData();  //１つ前のデータを保存
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
        itemInSound(); //効果音
      } else {
        alertSound();  //警告音
        alert("その場所にはすでに入庫されています。今一度場所をご確認ください。");  //データがある時は入力できないのでアラート
      }
    }
  }
  stockSort();    //優先順位更新
  enteringTheDepo();   //優先順位更新
  updateStockInfoVarnish();   //在庫情報更新
  varnishStockCount();  //在庫数更新
  saveData();  //データ保存
  flickeringColor(place,"varnishDueDate");  //文字背景点滅処理
}

//ワニス入庫ボタン3//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button3 = document.getElementById("button3");
button3.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = varnishStock[priorityPlaceVarnishElement].stockPlace; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "P710"; //フォーム追加後に変更

  arrivalVanish(place, getDate, line);  //入庫処理 arrival 関数を呼び出す
});

//ワニス入庫ボタン5//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button5 = document.getElementById("button5");
button5.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = varnishStock[priorityPlaceVarnishElement].stockPlace; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "P810"; //フォーム追加後に変更

  arrivalVanish(place, getDate, line);  //入庫処理 arrival 関数を呼び出す
});

//高粘度ワニス入庫ボタン7//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button7 = document.getElementById("button7");
button7.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = highViscosityVarnishStockP710[priorityPlaceHighVisVarnishElementP710].stockPlace; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "P710"; //
  const inputDueDate = new Date(document.getElementById("dueDate").value);

  if (!(Number.isNaN(inputDueDate.getTime()))) {   //期限日が入力されたとき＝inputDueDateがInvalid Dateではないとき
    arrivalHighViscosityVanish(place, getDate, inputDueDate, line);  //入庫処理 arrival 関数を呼び出す
  } else {
    alertSound();  //警告音
    alert("期限日が入力されておりません");
  }
});

//高粘度ワニス入庫ボタン9//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button9 = document.getElementById("button9");
button9.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = highViscosityVarnishStockP810[priorityPlaceHighVisVarnishElementP810].stockPlace; // フォームから場所を取得
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納
  const line = "P810"; //
  const inputDueDate = new Date(document.getElementById("dueDate").value);

  if (!(Number.isNaN(inputDueDate.getTime()))) {   //期限日が入力されたとき＝inputDueDateがInvalid Dateではないとき
    arrivalHighViscosityVanish(place, getDate, inputDueDate, line);  //入庫処理 arrival 関数を呼び出す
  } else {
    alertSound();  //警告音
    alert("期限日が入力されておりません");
  }
});

//触媒入庫ボタン11//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button11 = document.getElementById("button11");
button11.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納

  arrivalCatlystP710(getDate);  //入庫処理 arrival 関数を呼び出す
});

//触媒入庫ボタン13//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button13 = document.getElementById("button13");
button13.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const getInputDate = document.getElementById("stockDate"); //
  const getDate = getInputDate.value; //日付データ値を格納

  arrivalCatlystP810(getDate);  //入庫処理 arrival 関数を呼び出す
});

// 高粘度ワニス入庫処理//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function arrivalHighViscosityVanish(place, getDate, inputDueDate, line) {
  backData();  //１つ前のデータを保存
  // HTMLの<input type="date">から取得した文字列を日付型に変換
  const parsedDate = new Date(getDate);
  let array = [];
  if (line === "P810") {
    array = highViscosityVarnishStockP810;
    for (const object of array) {  //ワニス在庫のオブジェクト配列
      if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
        if (object.arrivalDate === "") {  //データがない時
          object.arrivalDate = parsedDate;  //オブジェクトの納入日を格納
          object.dueDate = inputDueDate;  //オブジェクトの期限日を格納
          object.line = line;        //オブジェクトのライン名を格納
          itemInSound(); //効果音
        } else {
          alertSound();  //警告音
          alert("その場所にはすでに入庫されています。今一度場所をご確認ください。");  //データがある時は入力できないのでアラート
        }
      }
    }
    stockSortHighVisP810();    //優先順位更新
    enteringTheDepoHighVisP810();   //入庫優先処理
    updateStockInfoHighVarnish();   //在庫情報画面更新
    saveData();  //データ保存
    flickeringColor(place,"highVarnishDueDate");  //文字背景点滅処理
  }
  else {
    array = highViscosityVarnishStockP710;
    for (const object of array) {  //ワニス在庫のオブジェクト配列
      if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
        if (object.arrivalDate === "") {  //データがない時
          object.arrivalDate = parsedDate;  //オブジェクトの納入日を格納
          object.dueDate = inputDueDate;  //オブジェクトの期限日を格納
          object.line = line;        //オブジェクトのライン名を格納
          itemInSound(); //効果音
        } else {
          alertSound();  //警告音
          alert("その場所にはすでに入庫されています。今一度場所をご確認ください。");  //データがある時は入力できないのでアラート
        }
      }
    }
    stockSortHighVisP710();    //優先順位更新
    enteringTheDepoHighVisP710();   //入庫優先処理
    updateStockInfoHighVarnish();    //在庫情報画面更新
    saveData();  //データ保存
    flickeringColor(place,"highVarnishDueDate");  //文字背景点滅処理
  }
}

//ワニス使用処理////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function use(place, line) {
  backData();  //１つ前のデータを保存
  for (const object of varnishStock) {  //ワニス在庫のオブジェクト配列
    if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
      if (object.arrivalDate !== "") {  //データがある時
        object.arrivalDate = "";  //オブジェクトの納入日を空
        object.dueDate = "";  //オブジェクトの期限日を空
        object.line = "";        //オブジェクトのライン名を空
        itemOutSound(); //効果音
      } else {
        alertSound();  //警告音
        alert("その場所に使用できるものはありません。場所をご確認ください。");  //データがない時は使用できないのでアラート
      }
    }
  }
  stockSort()    //使用優先順位更新
  enteringTheDepo()   //入庫優先順位更新
  updateStockInfoVarnish();   //在庫情報更新
  varnishStockCount()  //在庫数更新
  saveData();  //データ保存
  
  //触媒入れ忘れ防止ポカヨケ
  if (line === "P810") {
    buttonBTimer = setTimeout(alertP8, 0.5 * 60 * 1000); // 0.5分をミリ秒に変換
  } else {
    buttonATimer = setTimeout(alertP7, 0.5 * 60 * 1000); // 0.5分をミリ秒に変換
  }
}

//使用ボタン4//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useButton4 = document.getElementById("button4");
useButton4.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = varnishStock[firstVarnishElementP710].stockPlace; // P710使用優先場所を取得
  const line = "P710"; //フォーム追加後に変更
  use(place, line);  //使用処理 use 関数を呼び出す
});

//使用ボタン6//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useButton6 = document.getElementById("button6");
useButton6.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = varnishStock[firstVarnishElementP810].stockPlace; // P810使用優先場所を取得
  const line = "P810"; //フォーム追加後に変更
  use(place, line);  //使用処理 use 関数を呼び出す
});

//高粘度ワニス使用ボタン8//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useButton8 = document.getElementById("button8");
useButton8.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = highViscosityVarnishStockP710[firstHighVisVarnishElementP710].stockPlace; // P810使用優先場所を取得
  const line = "P710"; //フォーム追加後に変更
  useHighVis(place, line);  //使用処理 use 関数を呼び出す
});

//高粘度ワニス使用ボタン10//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useButton10 = document.getElementById("button10");
useButton10.addEventListener("click", function () {  //ボタンがクリックされたとき動作
  const place = highViscosityVarnishStockP810[firstHighVisVarnishElementP810].stockPlace; // P810使用優先場所を取得
  const line = "P810"; //フォーム追加後に変更
  useHighVis(place, line);  //使用処理 use 関数を呼び出す
});

//触媒出庫ボタン12//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button12 = document.getElementById("button12");
button12.addEventListener("click", shippingCatlystP710);

//触媒出庫ボタン14//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button14 = document.getElementById("button14");
button14.addEventListener("click", shippingCatlystP810);

//高粘度ワニス使用処理////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function useHighVis(place, line) {
  backData();  //１つ前のデータを保存
  let array = [];
  if (line === "P710") {
    array = highViscosityVarnishStockP710;
    for (const object of array) {  //ワニス在庫のオブジェクト配列
      if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
        if (object.arrivalDate !== "") {  //データがある時
          object.arrivalDate = "";  //オブジェクトの納入日を空
          object.dueDate = "";  //オブジェクトの期限日を空
          object.line = "";        //オブジェクトのライン名を空
          itemOutSound();  //効果音
        } else {
          alertSound();  //警告音
          alert("その場所に使用できるものはありません。場所をご確認ください。");  //データがない時は使用できないのでアラート
        }
      }
    }
    stockSortHighVisP710();    //優先順位更新
    enteringTheDepoHighVisP710();   //優先順位更新
    updateStockInfoHighVarnish();   //在庫情報画面更新
    saveData();  //データ保存
  }
  else if (line === "P810") {
    array = highViscosityVarnishStockP810;
    for (const object of array) {  //ワニス在庫のオブジェクト配列
      if (object.stockPlace === place) {  //入力placeとオブジェクトのstockplaceが同一の時に
        if (object.arrivalDate !== "") {  //データがある時
          object.arrivalDate = "";  //オブジェクトの納入日を空
          object.dueDate = "";  //オブジェクトの期限日を空
          object.line = "";        //オブジェクトのライン名を空
          itemOutSound();  //効果音
        } else {
          alertSound();  //警告音
          alert("その場所に使用できるものはありません。場所をご確認ください。");  //データがない時は使用できないのでアラート
        }
      }
    }
    stockSortHighVisP810();    //優先順位更新
    enteringTheDepoHighVisP810();   //優先順位更新
    updateStockInfoHighVarnish();   //在庫情報画面更新
    saveData();  //データ保存
  }
}


//ワニス使用優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let firstVarnishElementP710 = 0;
let firstVarnishElementP810 = 0;

function stockSort() {
  let firstDateA = new Date(9999, 11, 31);   //一番早い日付としての変数にまずは仮としてありえない日付に置く
  let firstDateB = new Date(9999, 11, 31);   //一番早い日付としての変数にまずは仮としてありえない日付に置く
  for (let i = 0; i < varnishStock.length; i++) {    //オブジェクトをループ
    if (varnishStock[i].line === "P710") {
      const objDate = varnishStock[i].arrivalDate;     //変数設定
      if (objDate) {
        const dateA = new Date(objDate);               //変数を日付型にして格納
        if (dateA < firstDateA) {                       //firstDateより早かったら
          firstDateA = dateA;                           //置き換える
          firstVarnishElementP710 = i;                     //その時の要素
        }
      }
    }
    if (varnishStock[i].line === "P810") {
      const objDate = varnishStock[i].arrivalDate;     //変数設定
      if (objDate) {
        const dateB = new Date(objDate);               //変数を日付型にして格納
        if (dateB < firstDateB) {                       //firstDateより早かったら
          firstDateB = dateB;                           //置き換える
          firstVarnishElementP810 = i;                     //その時の要素
        }
      }
    }
  }
}

//P710高粘度ワニス使用優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let firstHighVisVarnishElementP710 = 0;

function stockSortHighVisP710() {
  let firstDateA = new Date(9999, 11, 31);   //一番早い日付としての変数にまずは仮としてありえない日付に置く

  for (let i = 0; i < highViscosityVarnishStockP710.length; i++) {    //オブジェクトをループ
    if (highViscosityVarnishStockP710[i].line === "P710") {
      const objDate = highViscosityVarnishStockP710[i].dueDate;     //変数設定
      if (objDate) {
        const dateA = new Date(objDate);               //変数を日付型にして格納
        if (dateA < firstDateA) {                       //firstDateより早かったら
          firstDateA = dateA;                           //置き換える
          firstHighVisVarnishElementP710 = i;                     //その時の要素
        }
      }
    }
  }
}

//P810高粘度ワニス使用優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let firstHighVisVarnishElementP810 = 0;

function stockSortHighVisP810() {
  let firstDateA = new Date(9999, 11, 31);   //一番早い日付としての変数にまずは仮としてありえない日付に置く

  for (let i = 0; i < highViscosityVarnishStockP810.length; i++) {    //オブジェクトをループ
    if (highViscosityVarnishStockP810[i].line === "P810") {
      const objDate = highViscosityVarnishStockP810[i].dueDate;     //変数設定
      if (objDate) {
        const dateA = new Date(objDate);               //変数を日付型にして格納
        if (dateA < firstDateA) {                       //firstDateより早かったら
          firstDateA = dateA;                           //置き換える
          firstHighVisVarnishElementP810 = i;                     //その時の要素
        }
      }
    }
  }
}

//ワニス入庫優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let priorityPlaceVarnishElement = 0;

function enteringTheDepo() {
  let changeFlag = false; //変数priorityPlaceVarnishElementniに変化を与えたかどうかの真偽値
  for (let i = priorityPlaceVarnishElement; i < varnishStock.length; i++) { //前回入庫した要素から繰り返す
    if (varnishStock[i].arrivalDate === "") {     //データが無い時
      priorityPlaceVarnishElement = i;                   //要素番号を取得
      changeFlag = true;                          //フラグを真
      break;                                      //forループを抜ける
    }
  }
  if (changeFlag === false) {                //フラグが偽の時
    for (let i = 0; i < priorityPlaceVarnishElement; i++) {    //０から前回変更された要素まで
      if (varnishStock[i].arrivalDate === "") {         //データが無い時
        priorityPlaceVarnishElement = i;                       //要素番号を取得
        changeFlag = true;                              //フラグを真
        break;                                          //forループを抜ける
      }
    }
  }
  if (changeFlag === false) {
    alertSound();  //警告音
    alert("在庫がいっぱいだよ！")
  }
}

//P710高粘度ワニス入庫優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let priorityPlaceHighVisVarnishElementP710 = 0;

function enteringTheDepoHighVisP710() {
  let changeFlag = false; //変数priorityPlaceHighVisVarnishElementP710に変化を与えたかどうかの真偽値
  for (let i = priorityPlaceHighVisVarnishElementP710; i < highViscosityVarnishStockP710.length; i++) { //前回入庫した要素から繰り返す
    if (highViscosityVarnishStockP710[i].arrivalDate === "") {     //データが無い時
      priorityPlaceHighVisVarnishElementP710 = i;                   //要素番号を取得
      changeFlag = true;                          //フラグを真
      break;                                      //forループを抜ける
    }
  }
  if (changeFlag === false) {                //フラグが偽の時
    for (let i = 0; i < priorityPlaceHighVisVarnishElementP710; i++) {    //０から前回変更された要素まで
      if (highViscosityVarnishStockP710[i].arrivalDate === "") {         //データが無い時
        priorityPlaceHighVisVarnishElementP710 = i;                       //要素番号を取得
        changeFlag = true;                              //フラグを真
        break;                                          //forループを抜ける
      }
    }
  }
  if (changeFlag === false) {
  　alertSound();  //警告音
    alert("在庫がいっぱいだよ！")
  }
}

//P810高粘度ワニス入庫優先///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let priorityPlaceHighVisVarnishElementP810 = 0;

function enteringTheDepoHighVisP810() {
  let changeFlag = false; //変数priorityPlaceHighVisVarnishElementP810に変化を与えたかどうかの真偽値
  for (let i = priorityPlaceHighVisVarnishElementP810; i < highViscosityVarnishStockP810.length; i++) { //前回入庫した要素から繰り返す
    if (highViscosityVarnishStockP810[i].arrivalDate === "") {     //データが無い時
      priorityPlaceHighVisVarnishElementP810 = i;                   //要素番号を取得
      changeFlag = true;                          //フラグを真
      break;                                      //forループを抜ける
    }
  }
  if (changeFlag === false) {                //フラグが偽の時
    for (let i = 0; i < priorityPlaceHighVisVarnishElementP810; i++) {    //０から前回変更された要素まで
      if (highViscosityVarnishStockP810[i].arrivalDate === "") {         //データが無い時
        priorityPlaceHighVisVarnishElementP810 = i;                       //要素番号を取得
        changeFlag = true;                              //フラグを真
        break;                                          //forループを抜ける
      }
    }
  }
  if (changeFlag === false) {
    
    alert("在庫がいっぱいだよ！")
  }
}

//入庫処理ハンディー用(CSV ver)/////////////////////////////////////////////////////////////////////////////////////////////////////////
// webSocket接続でデータを入力
const socket = new WebSocket('ws://localhost:8765');
let inputtext = [];  //ハンディーで読んだデータを格納する配列
let csvData = [];
let indication = "";
const connectionConfirmation = document.getElementById("connectionConfirmation");

socket.onopen = () => {
  console.log('WebSocket接続が確立されました');
  indication = '接続完了';
  connectionConfirmation.innerText = indication;
};

let isProcessing = false;

socket.onmessage = (event) => {
  if(!isProcessing){
    isProcessing = true;

    console.log("イベント発生");
    // Pythonサーバーからデータを受信したときの処理
    let data = event.data;
    console.log('受信したデータ:', data);
    if(data.length <= 20){  //json保存データが処理される対策
      if(data.startsWith(",")){  //ワニスは先頭に日付がないので , を抜く
        data = data.slice(1);
        console.log(data);
      }
      else{
      //年月日情報をyyyy/mm/dd形式に変更
        let strA = data.slice(0,4);
        let strB = data.slice(4,6);
        let strC = data.slice(6);
        data = strA + "/" + strB + "/" + strC;
      }
      csvData = data.split(",");
      console.log(csvData);
      inputCsvData(csvData);
    }

    setTimeout(() => {  //２重処理無効のため
      isProcessing = false;
    }, 1000);  //1秒後に処理を有効化

  } else {
    console.log("処理中...");
  }
};

socket.onclose = () => {
  console.log('WebSocket接続が閉じられました');
  indication = '未接続';
  connectionConfirmation.innerText = indication;
};

socket.onerror = (error) => {
  console.error('WebSocketエラー:', error);
  indication = '接続エラー';
  connectionConfirmation.innerText = indication;
};


//csvデータ１次処理///////////////////////////////////////////////
function inputCsvData(csvData) {
  let processNo = "";
  for (let i = 0; i < csvData.length; i++) {
    if (csvData[i] === "0" || csvData[i] === "1" || csvData[i] === "100") { //0の時は入庫 1の時は使用　100は1つ戻る
      processNo = csvData.splice(i, 1)[0].toString(); //処理番号を変数に入れる
    }
  }
  for (const element of csvData) {
    if (element !== "") {
      inputtext.push(element);
    }
  }
  console.log(inputtext)
  if (processNo === "0") { //処理番号0:入庫、の時は入庫
    warehousing();  //入力データワニス入庫処理関数実行
  }
  else if (processNo === "1" && inputtext.length === 1) {  //処理番号1:出庫、配列の要素数1の時はワニス出庫
    issueVanish();    //入力データワニス出庫処理関数実行
  }
  else if (processNo === "1" && inputtext.length === 2) {  //処理番号1:出庫、配列の要素数2の時は高粘度ワニス出庫
    issueHighVisVanish();    //入力データ高粘度ワニス出庫処理関数実行
  }
  else if(processNo === "100"){
    backToData("handy");  //１つ戻る関数の呼び出し
  }
}

//入力データ入庫処理 （ライン名・高粘度ワニスは使用期限)//////////////////////////////////////////////////////////////////////////////////////////
function warehousing() {
  const lineA = "PT253";   //組コードが変わったらここを変更する
  const lineB = "PT451";   //組コードが変わったらここを変更する
  const lineC = "PT431";   //組コードが変わったらここを変更する
  let line = "";
  const getInputDate = document.getElementById("stockDate");     //HTMLの日付データ
  const getDate = getInputDate.value; //日付データ値を格納

  //誤入力で空白のデータがあったら除去
  for (let i = 0; i < inputtext.length; i++) {
    if (inputtext[i] === "") {
      inputtext.splice(i, 1);
    }
  }
  //ワニス入庫処理
  if (inputtext.length === 1) {   //ワニス入庫の時は要素が１つ
    const place = varnishStock[priorityPlaceVarnishElement].stockPlace;   //入庫優先場所
    for (const element of inputtext) {
      if (element === lineA || element === lineC) {
        line = "P710";
      }
      else if (element === lineB) {
        line = "P810";
      }
    }
    arrivalVanish(place, getDate, line)    //ワニス入庫処理実行
  }
  //高粘度ワニスの入庫処理
  if (inputtext.length === 2) {   //高粘度ワニス入庫の時は要素が2つ
    let place = "";
    let inputDueDate = new Date();
    let standardDueDate = "";
    const yearMonthDay = /(年|月|日)/;
    for (const element of inputtext) {
      if (element === lineA || element === lineC) {
        line = "P710";
        place = highViscosityVarnishStockP710[priorityPlaceHighVisVarnishElementP710].stockPlace;
      }
      else if (element === lineB) {
        line = "P810";
        place = highViscosityVarnishStockP810[priorityPlaceHighVisVarnishElementP810].stockPlace;
      }
      //ここから期限日の処理
      else if (yearMonthDay.test(element)) {  //要素に年月日が含まれるなら
        standardDueDate = element.replace(/年|月/g, '-').replace(/日/, '');  //年月日から標準的な書き方に変更
        inputDueDate = new Date(standardDueDate);  //期限日を格納
      }
      else {
        inputDueDate = new Date(element);  //通常のyyyy/mm/dd表記用
      }
    }
    arrivalHighViscosityVanish(place, getDate, inputDueDate, line)    //高粘度ワニス入庫処理実行
  }
  inputtext = [];     //入力データ初期化
}


//入力データワニス出庫処理 
function issueVanish() {
  const lineA = "PT253";   //組コードが変わったらここを変更する
  const lineB = "PT451";   //組コードが変わったらここを変更する
  const lineC = "PT431";   //組コードが変わったらここを変更する

  //誤入力で空白のデータがあったら除去
  for (let i = 0; i < inputtext.length; i++) {
    if (inputtext[i] === "") {
      inputtext.splice(i, 1);
    }
  }
  //ワニス出庫処理
  if (inputtext.length === 1) {
    for (const element of inputtext) {
      if (element === lineA || element === lineC) {
        use(varnishStock[firstVarnishElementP710].stockPlace, "P710");
      }
      else if (element === lineB) {
        use(varnishStock[firstVarnishElementP810].stockPlace, "P810");
      }
    }
  }
  inputtext = [];     //入力データ初期化
}


//入力データ高粘度ワニス出庫処理 
function issueHighVisVanish() {
  const lineA = "PT253";   //組コードが変わったらここを変更する
  const lineB = "PT451";   //組コードが変わったらここを変更する
  const lineC = "PT431";   //組コードが変わったらここを変更する

  //誤入力で空白のデータがあったら除去
  for (let i = 0; i < inputtext.length; i++) {
    if (inputtext[i] === "") {
      inputtext.splice(i, 1);
    }
  }
  //高粘度ワニス出庫処理
  for (const element of inputtext) {
    if (element === lineA || element === lineC) {
      useHighVis(highViscosityVarnishStockP710[firstHighVisVarnishElementP710].stockPlace, "P710");
    }
    else if (element === lineB) {
      useHighVis(highViscosityVarnishStockP810[firstHighVisVarnishElementP810].stockPlace, "P810");
    }
  }
  inputtext = [];     //入力データ初期化
}


//savedata////////////////////////////////////////////////////////////////////////////////////
// JSONファイルに保存するデータ
function saveData() {
  const data = {
    varnishStock,
    highViscosityVarnishStockP710,
    highViscosityVarnishStockP810,
    catalystStockDateP710,
    catalystStockDueDateP710,
    inventoryCountP710,
    catalystStockDateP810,
    catalystStockDueDateP810,
    inventoryCountP810,
    priorityPlaceVarnishElement,
    priorityPlaceHighVisVarnishElementP710,
    priorityPlaceHighVisVarnishElementP810,
    firstVarnishElementP710,
    firstVarnishElementP810,
    firstHighVisVarnishElementP710,
    firstHighVisVarnishElementP810
  };

  const jsonSaveData = JSON.stringify(data);
  // ローカルストレージに保存
  localStorage.setItem('myData', jsonSaveData);
  //サーバーへデータ送信
  socket.send(jsonSaveData);
}

//loaddata///////////////////////////////////////////////////////////////////////////////////////////////////////
// ローカルストレージからデータを取得///////////////////////////////////////////////
const jsonLoadData = localStorage.getItem('myData');

if (jsonLoadData) {
  // JSONデータをJavaScriptオブジェクトに変換
  const data = JSON.parse(jsonLoadData);

  // 各変数にデータを代入
  varnishStock = data.varnishStock;
  highViscosityVarnishStockP710 = data.highViscosityVarnishStockP710;
  highViscosityVarnishStockP810 = data.highViscosityVarnishStockP810;
  catalystStockDateP710 = data.catalystStockDateP710;
  catalystStockDueDateP710 = data.catalystStockDueDateP710;
  inventoryCountP710 = data.inventoryCountP710;
  catalystStockDateP810 = data.catalystStockDateP810;
  catalystStockDueDateP810 = data.catalystStockDueDateP810;
  inventoryCountP810 = data.inventoryCountP810;
  priorityPlaceVarnishElement = data.priorityPlaceVarnishElement;
  priorityPlaceHighVisVarnishElementP710 = data.priorityPlaceHighVisVarnishElementP710;
  priorityPlaceHighVisVarnishElementP810 = data.priorityPlaceHighVisVarnishElementP810;
  firstVarnishElementP710 = data.firstVarnishElementP710;
  firstVarnishElementP810 = data.firstVarnishElementP810;
  firstHighVisVarnishElementP710 = data.firstHighVisVarnishElementP710;
  firstHighVisVarnishElementP810 = data.firstHighVisVarnishElementP810;

  updateStockInfoVarnish(); //ワニス在庫表示更新
  updateStockInfoHighVarnish();  //高粘度ワニス在庫表示更新

} else {
  // ローカルストレージにデータが存在しない場合の処理
  updateStockInfoVarnish(); //ワニス在庫表示更新
  updateStockInfoHighVarnish();  //高粘度ワニス在庫表示更新
  alert('No data found in local storage.');
}

//JSONファイルからデータ復元/////////////////////////////////////////////////////
const button16 = document.getElementById("button16");
button16.addEventListener("click", loadData)   //ボタンがクリックされたとき動作

function loadData() {
  const fileInput = document.getElementById('fileInput');
  // ファイルが選択されているか確認
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    // ファイルの読み込みが完了したときの処理
    reader.onload = function (event) {
      const jsonSavedData = event.target.result;

      try {
        // JSONデータをJavaScriptオブジェクトにパース
        const loadedData = JSON.parse(jsonSavedData);
        // 各変数にデータを代入
        varnishStock = loadedData.varnishStock;
        highViscosityVarnishStockP710 = loadedData.highViscosityVarnishStockP710;
        highViscosityVarnishStockP810 = loadedData.highViscosityVarnishStockP810;
        catalystStockDateP710 = loadedData.catalystStockDateP710;
        catalystStockDueDateP710 = loadedData.catalystStockDueDateP710;
        inventoryCountP710 = loadedData.inventoryCountP710;
        catalystStockDateP810 = loadedData.catalystStockDateP810;
        catalystStockDueDateP810 = loadedData.catalystStockDueDateP810;
        inventoryCountP810 = loadedData.inventoryCountP810;
        priorityPlaceVarnishElement = loadedData.priorityPlaceVarnishElement;
        priorityPlaceHighVisVarnishElementP710 = loadedData.priorityPlaceHighVisVarnishElementP710;
        priorityPlaceHighVisVarnishElementP810 = loadedData.priorityPlaceHighVisVarnishElementP810;
        firstVarnishElementP710 = loadedData.firstVarnishElementP710;
        firstVarnishElementP810 = loadedData.firstVarnishElementP810;
        firstHighVisVarnishElementP710 = loadedData.firstHighVisVarnishElementP710;
        firstHighVisVarnishElementP810 = loadedData.firstHighVisVarnishElementP810;

        dataLoadSound();  //効果音
        updateStockInfoVarnish(); //ワニス在庫表示更新
        updateStockInfoHighVarnish();  //高粘度ワニス在庫表示更新
        updateStockInfocata();  //触媒在庫情報更新
        alert("データ復元完了");

      } catch (error) {
        // パースエラーが発生した場合の処理
        alertSound(); //効果音
        alert('データの復元中にエラーが発生しました:', error);
      }
    };
    // ファイルをテキストとして読み込む
    reader.readAsText(file);
    // ファイル名を表示する
  } else {
    alertSound(); //効果音
    alert('ファイルが選択されていません。');
  }
}

//localdataをclear//////////////////////////////////////////////////////////////////////////////
const button15 = document.getElementById("button15");
button15.addEventListener("click", saveDataClear)   //ボタンがクリックされたとき動作

function saveDataClear() {
  localStorage.clear();  //ローカルストレージの保存データクリア
  location.reload();    //ページリロード
}

//ボタン表示非表示////////////////////////////////////////////////////////////////////////////////
function toggleAllVisibility() {
  var elements = document.querySelectorAll('.selecteditem');

  elements.forEach(function (element) {
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
  });
}

//効果音////////////////////////////////////////////////////////////////////////////////////////
//警告/////
function alermSound() {
  document.getElementById("AlermSound").currentTime = 0;
  document.getElementById("AlermSound").play();
}

//itemin/////
function itemInSound() {
  document.getElementById("itemInSound").currentTime = 0;
  document.getElementById("itemInSound").play();
}

//itemout/////
function itemOutSound() {
  document.getElementById("itemOutSound").currentTime = 0;
  document.getElementById("itemOutSound").play();
}

//alert/////
function alertSound() {
  document.getElementById("alertSound").currentTime = 0;
  document.getElementById("alertSound").play();
}

//dataLoad/////
function dataLoadSound() {
  document.getElementById("dataLoadSound").currentTime = 0;
  document.getElementById("dataLoadSound").play();
}

// ページを自動で更新する関数///////////////////////////////////////////////////////////////////
function autoRefresh() {
  location.reload();
}

// ページ読み込み後、毎時autoRefreshを呼ぶ
setInterval(autoRefresh, 3600000);

//入力間違いの時に１つ戻る処理backData////////////////////////////////////////////////////////////////////////////////////
//backData////////////////////////////////////////////////////////////////////////////////////
// 1つ戻るデータ格納用変数
let backDataVarnishStock = {};
let backDataHighViscosityVarnishStockP710 = {};
let backDataHighViscosityVarnishStockP810 = {};
let backDataCatalystStockDateP710 = [];
let backDataCatalystStockDueDateP710 = [];
let backDataInventoryCountP710 = 0;
let backDataCatalystStockDateP810 = [];
let backDataCatalystStockDueDateP810 = [];
let backDataInventoryCountP810 = 0;
let backDataPriorityPlaceVarnishElement = 0;
let backDataPriorityPlaceHighVisVarnishElementP710 = 0;
let backDataPriorityPlaceHighVisVarnishElementP810 = 0;
let backDataFirstVarnishElementP710 = 0;
let backDataFirstVarnishElementP810 = 0;
let backDataFirstHighVisVarnishElementP710 = 0;
let backDataFirstHighVisVarnishElementP810 = 0;
let backToDataFlag = 0;  //戻れるかのフラグ。0ならOK、1ならNG

//戻すデータの格納処理
function backData() {  //メモリ内の同じところを参照しないようにjsonで処理
  backDataVarnishStock = JSON.parse(JSON.stringify(varnishStock));
  backDataHighViscosityVarnishStockP710 = JSON.parse(JSON.stringify(highViscosityVarnishStockP710));
  backDataHighViscosityVarnishStockP810 = JSON.parse(JSON.stringify(highViscosityVarnishStockP810));
  backDataCatalystStockDateP710 = JSON.parse(JSON.stringify(catalystStockDateP710));
  backDataCatalystStockDueDateP710 = JSON.parse(JSON.stringify(catalystStockDueDateP710));
  backDataInventoryCountP710 = JSON.parse(JSON.stringify(inventoryCountP710));
  backDataCatalystStockDateP810 = JSON.parse(JSON.stringify(catalystStockDateP810));
  backDataCatalystStockDueDateP810 = JSON.parse(JSON.stringify(catalystStockDueDateP810));
  backDataInventoryCountP810 = JSON.parse(JSON.stringify(inventoryCountP810));
  backDataPriorityPlaceVarnishElement = JSON.parse(JSON.stringify(priorityPlaceVarnishElement));
  backDataPriorityPlaceHighVisVarnishElementP710 = JSON.parse(JSON.stringify(priorityPlaceHighVisVarnishElementP710));
  backDataPriorityPlaceHighVisVarnishElementP810 = JSON.parse(JSON.stringify(priorityPlaceHighVisVarnishElementP810));
  backDataFirstVarnishElementP710 = JSON.parse(JSON.stringify(firstVarnishElementP710));
  backDataFirstVarnishElementP810 = JSON.parse(JSON.stringify(firstVarnishElementP810));
  backDataFirstHighVisVarnishElementP710 = JSON.parse(JSON.stringify(firstHighVisVarnishElementP710));
  backDataFirstHighVisVarnishElementP810 = JSON.parse(JSON.stringify(firstHighVisVarnishElementP810));
  backToDataFlag = 0;
}

//backDtataに戻す
function backToData(input) {    //メモリ内の同じところを参照しないようにjsonで処理
  if (backToDataFlag === 0) {
    varnishStock = JSON.parse(JSON.stringify(backDataVarnishStock));
    highViscosityVarnishStockP710 = JSON.parse(JSON.stringify(backDataHighViscosityVarnishStockP710));
    highViscosityVarnishStockP810 = JSON.parse(JSON.stringify(backDataHighViscosityVarnishStockP810));
    catalystStockDateP710 = JSON.parse(JSON.stringify(backDataCatalystStockDateP710));
    catalystStockDueDateP710 = JSON.parse(JSON.stringify(backDataCatalystStockDueDateP710));
    inventoryCountP710 = JSON.parse(JSON.stringify(backDataInventoryCountP710));
    catalystStockDateP810 = JSON.parse(JSON.stringify(backDataCatalystStockDateP810));
    catalystStockDueDateP810 = JSON.parse(JSON.stringify(backDataCatalystStockDueDateP810));
    inventoryCountP810 = JSON.parse(JSON.stringify(backDataInventoryCountP810));
    priorityPlaceVarnishElement = JSON.parse(JSON.stringify(backDataPriorityPlaceVarnishElement));
    priorityPlaceHighVisVarnishElementP710 = JSON.parse(JSON.stringify(backDataPriorityPlaceHighVisVarnishElementP710));
    priorityPlaceHighVisVarnishElementP810 = JSON.parse(JSON.stringify(backDataPriorityPlaceHighVisVarnishElementP810));
    firstVarnishElementP710 = JSON.parse(JSON.stringify(backDataFirstVarnishElementP710));
    firstVarnishElementP810 = JSON.parse(JSON.stringify(backDataFirstVarnishElementP810));
    firstHighVisVarnishElementP710 = JSON.parse(JSON.stringify(backDataFirstHighVisVarnishElementP710));
    firstHighVisVarnishElementP810 = JSON.parse(JSON.stringify(backDataFirstHighVisVarnishElementP810));
    backToDataFlag = 1;
    dataLoadSound()  //効果音
    updateStockInfoVarnish(); //ワニス在庫表示更新
    updateStockInfoHighVarnish();  //高粘度ワニス在庫表示更新
    updateStockInfocata();  //触媒在庫情報更新
    clearTimeout(buttonBTimer);  //入れ忘れ防止タイマーキャンセル
    clearTimeout(buttonATimer);  //入れ忘れ防止タイマーキャンセル
    console.log(input);
    if (input === "button") {
      alert("データ戻し完了");
    }
  }
  else {
    alertSound();  //効果音
    if (input === "button") {
      alert("もう後戻りなんか出来ない！前を見るんだ('ω')ノ");
    }
  }
}

//１つ戻る処理実行
//１つ戻る処理実行
const button17 = document.getElementById("button17");
button17.addEventListener("click", () => backToData("button"));   //ボタンがクリックされたとき動作

//期限日が近づいたら背景色を変化////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ページロード時と日付変更時の処理をまとめた関数
function updateVarnishColors() {
  // 入力された日付を取得
  let inputDate = new Date(document.getElementById('stockDate').value);

  // varnishStockの各オブジェクトに対して処理
  for (let i = 0; i < varnishStock.length; i++) {
    // 比較する dueDate を取得
    let dueDate = new Date(varnishStock[i].dueDate);

    // 日付の差を計算（ミリ秒単位）
    let dateDifference = dueDate - inputDate;

    // ミリ秒を日に変換
    let daysDifference = dateDifference / (1000 * 60 * 60 * 24);

    // 背景色を変更
    let varnishId = 'varnishDueDate' + varnishStock[i].stockPlace;
    let varnishElement = document.getElementById(varnishId);

    if (daysDifference >= -100 && daysDifference <= 5) {
      varnishElement.classList.add('date-difference-alert');
    } else {
      varnishElement.classList.remove('date-difference-alert');
    }
  }
  //高粘度ワニスP710の処理
  for (let i = 0; i < highViscosityVarnishStockP710.length; i++) {
    // 比較する dueDate を取得
    let dueDateP710 = new Date(highViscosityVarnishStockP710[i].dueDate);

    // 日付の差を計算（ミリ秒単位）
    let dateDifferenceP710 = dueDateP710 - inputDate;

    // ミリ秒を日に変換
    let daysDifferenceP710 = dateDifferenceP710 / (1000 * 60 * 60 * 24);

    // 背景色を変更
    let highVarnishIdP710 = 'highVarnishDueDate' + highViscosityVarnishStockP710[i].stockPlace;
    let highVarnishElementP710 = document.getElementById(highVarnishIdP710);

    if (daysDifferenceP710 >= -100 && daysDifferenceP710 <= 5) {
      highVarnishElementP710.classList.add('date-difference-alert');
    } else {
      highVarnishElementP710.classList.remove('date-difference-alert');
    }
  }
  //高粘度ワニスP810の処理
  for (let i = 0; i < highViscosityVarnishStockP810.length; i++) {
    // 比較する dueDate を取得
    let dueDateP810 = new Date(highViscosityVarnishStockP810[i].dueDate);

    // 日付の差を計算（ミリ秒単位）
    let dateDifferenceP810 = dueDateP810 - inputDate;

    // ミリ秒を日に変換
    let daysDifferenceP810 = dateDifferenceP810 / (1000 * 60 * 60 * 24);

    // 背景色を変更
    let highVarnishIdP810 = 'highVarnishDueDate' + highViscosityVarnishStockP810[i].stockPlace;
    let highVarnishElementP810 = document.getElementById(highVarnishIdP810);

    if (daysDifferenceP810 >= -100 && daysDifferenceP810 <= 5) {
      highVarnishElementP810.classList.add('date-difference-alert');
    } else {
      highVarnishElementP810.classList.remove('date-difference-alert');
    }
  }

}

// ページロード時に初期化
window.addEventListener('load', updateVarnishColors);

// Date input change event
document.getElementById('stockDate').addEventListener('change', updateVarnishColors);

//選択してデータを消去/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function eraseData() {
  let selectedNum = Number(selectPlace.value);  //HTMLで選択されたvalueをnumber型へ変更し格納

  if (0 <= selectedNum && selectedNum <= 11) {
    varnishStock[selectedNum].arrivalDate = "";
    varnishStock[selectedNum].dueDate = "";
    varnishStock[selectedNum].line = "";
    enteringTheDepo();  //ワニス入庫優先更新
    stockSort();  //ワニス使用優先更新
  }
  else if (12 <= selectedNum && selectedNum <= 15) {
    highViscosityVarnishStockP710[selectedNum - 12].arrivalDate = "";
    highViscosityVarnishStockP710[selectedNum - 12].dueDate = "";
    highViscosityVarnishStockP710[selectedNum - 12].line = "";
    enteringTheDepoHighVisP710();  //P710高粘度ワニス入庫優先更新
    stockSortHighVisP710(); //P710高粘度ワニス使用優先更新
  }
  else if (16 <= selectedNum && selectedNum <= 19) {
    highViscosityVarnishStockP810[selectedNum - 16].arrivalDate = "";
    highViscosityVarnishStockP810[selectedNum - 16].dueDate = "";
    highViscosityVarnishStockP810[selectedNum - 16].line = "";
    enteringTheDepoHighVisP810();  //P810高粘度ワニス入庫優先更新
    stockSortHighVisP810(); //P810高粘度ワニス使用優先更新
  }

  updateStockInfoVarnish(); //ワニス在庫表示更新
  updateStockInfoHighVarnish();  //高粘度ワニス在庫表示更新
  updateStockInfocata();  //触媒在庫情報更新
  clearTimeout(buttonBTimer);  //入れ忘れ防止タイマーキャンセル
  clearTimeout(buttonATimer);  //入れ忘れ防止タイマーキャンセル
  saveData();  //データ保存
}

let selectPlace = document.getElementById('selectPlace');  //選択された消去したい場所

let elaseButton = document.getElementById('button18');
elaseButton.addEventListener('click', eraseData);         //ボタン18クリックでelaseData関数が呼び出される


//文字背景の点滅処理//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function flickeringColor(place,type) {
 
  let varnishDueDate = document.getElementById(`${type}${place}`);
  console.log(varnishDueDate);
  console.log(`${type}${place}`);
  // 文字背景を緑色にする関数
  function toggleBackgroundColor() {
    if (varnishDueDate.style.backgroundColor === 'blue') {
      varnishDueDate.style.backgroundColor = '';
      varnishDueDate.style.color = 'black'; // 文字色を元に戻す
    } else {
      varnishDueDate.style.backgroundColor = 'blue';
      varnishDueDate.style.color = 'white'; // 背景が緑の場合に文字色を白に変更
    }
  }
  //点滅表示
  let intervalId = setInterval(toggleBackgroundColor, 500); // 0.5秒ごとに実行
  // 60秒後に点滅を停止
  setTimeout(() => {
    clearInterval(intervalId);
    varnishDueDate.style.backgroundColor = ''; // 背景色をクリア
    varnishDueDate.style.color = 'black'; // 文字色を元に戻す
  }, 15000); // 15秒後にクリア(setIntervalによっては偶数秒でないと色が残ることもある)
}
