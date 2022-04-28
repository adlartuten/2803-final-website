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
    
    stock.innerText = '$' + this.response['1. open'];
    stock1.innerText = '$' + this.response['2. high'];
    stock2.innerText = '$' + this.response['3. low']; // sets the status text accordingly

}

searchbutt.addEventListener("click", loadStock);