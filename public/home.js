let data = document.getElementById('stock');
let searchbutt = document.getElementById("loadStockButton");
let pass = document.getElementById("search");
let stock = document.getElementById("stockP1");
let stock1 = document.getElementById("stockP2");
let stock2 = document.getElementById("stockP3");
let logStatusButton = document.getElementById("logStatus");
var authenticated = false;

function loadStock() {
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    let url = '/convert'
    
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();

}

function responseHandler() {
    stock.style.display = "block";

    var num = this.response['1. open'];
    var res = Number(num).toFixed(2);

    var num1 = this.response['2. high'];
    var res1 = Number(num1).toFixed(2);

    var num2 = this.response['3. low'];
    var res2 = Number(num2).toFixed(2);
    
    stock.innerText = '$' + `${res}`;
    stock1.innerText = '$' + `${res1}`;
    stock2.innerText = '$' + `${res2}`; // sets the status text accordingly

}

searchbutt.addEventListener("click", loadStock);