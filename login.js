// set up variables from HTML document
let loginButton = document.getElementById("login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let message = document.getElementById("status");

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
}

// add the event listener to the login button
loginButton.addEventListener("click", login);