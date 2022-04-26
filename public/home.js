

let data = document.getElementById('stock');
let searchbutt = document.getElementById("signupButton");
let pass = document.getElementById("search");
let stock = document.getElementById("stockP1");
let stock1 = document.getElementById("stockP2");
let stock2 = document.getElementById("stockP3");





function signup() {
    // needed for custom actions

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

searchbutt.addEventListener("click", signup)






