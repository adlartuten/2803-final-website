// set up variables from HTML document
let loginButton = document.getElementById("login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let message = document.getElementById("status");
let loginText = document.getElementById("logStatus");
let chatButton = document.getElementById("chatButton");

// login button function
function login(event) {
    event.preventDefault(); // needed for custom actions
    // set up XHR to send the data secretly
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    query = `username=${username.value}&password=${password.value}`; // query string sent in JSON body
    url = `/attempt_login`; // URL to go to when clicked (handled in express route in server.js)
    xhr.responseType = "json"; // sets to use JSON data
    xhr.open("POST", url); // must be POST because we are sending data
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(query); // send the request to the server
}

// function to run after XHR is done
function responseHandler() {
    message.style.display = "block";
    message.innerText = this.response.message; // sets the status text accordingly
    if (this.response.message == "Successfully logged in!") {
        loggedIn = true;
        window.location.href = "home";
    }
}

// add the event listener to the login button
loginButton.addEventListener("click", login);

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
    if (this.response.message == "Login") {
        chatButton.remove();
    }
}

window.addEventListener("load", checkLogStatus);