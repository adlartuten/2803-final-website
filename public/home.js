let data = document.getElementById('stock');
let searchbutt = document.getElementById("loadStockButton");
let pass = document.getElementById("search");
let stock = document.getElementById("stockP1");
let stock1 = document.getElementById("stockP2");
let stock2 = document.getElementById("stockP3");
let loginText = document.getElementById("logStatus");
let registerButton = document.getElementById("registerButton");

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

function checkLogStatus() {
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", resHander);
    url = "/logged_in";
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    console.log("hello");
}

function resHander() {
    loginText.innerHTML = `<a href='login'>${this.response.message}</a>`
    if (this.response.message == "Log Out") {
        registerButton.remove();
    }
}

window.addEventListener("load", checkLogStatus);



