let loginText = document.getElementById("logStatus");
let registerButton = document.getElementById("registerButton");
let chatButton = document.getElementById("chatButton");

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
    loginText.innerHTML = `<a href='login'>${this.response.message}</a>`;
    if (this.response.message == "Log Out") {
        registerButton.remove();
    }
}

window.addEventListener("load", checkLogStatus);