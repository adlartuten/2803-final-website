let buyButt = document.getElementById("buy");
let loginText = document.getElementById("logStatus");
let registerButton = document.getElementById("registerButton");

function buyStock(event) {
    event.preventDefault();

    window.location.href="https://www.stash.com/investments/stocks/apple-aapl/";
} 

buyButt.addEventListener("click", buyStock);

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
    loginText.innerHTML = `<a href='login'>${this.response.message}</a>`;
    if (this.response.message == "Log Out") {
        registerButton.remove();
    }
}

window.addEventListener("load", checkLogStatus);