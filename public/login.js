let loginButton = document.getElementById("login");
let username = document.getElementById("username");
let password = document.getElementById("password");

function login(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    query = `username=${username.value}&password=${password.value}`;
    url = `/attempt_login`;
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(query);
}

function responseHandler() {
    let message = document.getElementById("message");
    message.style.display = "block";
    if (this.response.success) {
        message.innerText = "Success";
    } else {
        message.innerText = "Failure";
    }
}

loginButton.addEventListener("click", login);