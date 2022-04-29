// setup variables from HTML document
let signupButton = document.getElementById("signupButton");
let username = document.getElementById("username");
let pass = document.getElementById("password");
let pass2 = document.getElementById("password2");
let message = document.getElementById("status");
let loginText = document.getElementById("logStatus");
let chatButton = document.getElementById("chatButton");

// signup button function
function signup(event) {
    event.preventDefault(); // needed for custom actions

    // make sure password is not empty
    let emptyPassword = true;
    if (pass.value.length > 0 || pass2.value.length > 0) { // if either field has text, it is not empty
        emptyPassword = false;
    } else { // otherwise it is empty
        emptyPassword = true;
    }

    if (pass.value === pass2.value && !emptyPassword) { // if password matches confirm password field
        // set up XHR to send the data secretly
        let xhr = new XMLHttpRequest;
        xhr.addEventListener("load", responseHandler);
        query = `username=${username.value}&password=${password.value}`; // query string sent in JSON body
        url = `/attempt_register`; // URL to go to when clicked (handled in express route in server.js)
        xhr.responseType = "json"; // sets to JSON data
        xhr.open("POST", url); // must be POST because we are sending data
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(query); // send the request to the server
    } else if (emptyPassword) {
        message.style.display = "block";
        message.innerText = "Password cannot be empty.";
    } else { // if the passwords do not match
        message.style.display = "block";
        message.innerText = "Passwords do not match.";
    }
}

// function to run after XHR is done
function responseHandler() {
    message.style.display = "block";
    message.innerText = this.response.message; // sets the status text accordingly
}

// add the event listener to sign up button
signupButton.addEventListener("click", signup);

function checkLogStatus() {
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", resHander);
    url = "/logged_in";
    xhr.responseType = "json";
    xhr.open("POST", url);
    console.log("hello");
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