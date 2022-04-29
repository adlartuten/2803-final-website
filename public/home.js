let data = document.getElementById('stock');
let searchbutt = document.getElementById("loadStockButton");
let pass = document.getElementById("search");
let stock = document.getElementById("stockP1");
let stock1 = document.getElementById("stockP2");
let stock2 = document.getElementById("stockP3");
let loginText = document.getElementById("logStatus");
let registerButton = document.getElementById("registerButton");
let errorText = document.getElementById("errorText");
let chatButton = document.getElementById("chatButton");
let shouldLoad = false;

function loadStock() {
    if (shouldLoad) {
        let xhr = new XMLHttpRequest;
        xhr.addEventListener("load", responseHandler);
        let url = '/convert'
        xhr.responseType = "json";
        xhr.open("GET", url);
        xhr.send();
    } else {
        errorText.textContent = "Please Log In first";
    }

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

function checkLogStatus() {
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", resHander);
    url = "/logged_in";
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function resHander() {
    loginText.innerHTML = `<a href='login'>${this.response.message}</a>`
    if (this.response.message == "Log Out") {
        registerButton.remove();
        shouldLoad = true;
    } else if (this.response.message == "Login") {
        chatButton.remove();
    }
}

window.addEventListener("load", checkLogStatus);



