// set up node requirements
const express = require("express");
const res = require("express/lib/response");
const {json} = require("express/lib/response");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const costFactor = 11; // for bcrypt to encrypt passwords
let authenticated = false; // status if user is logged in

// connects to a local SQL database
// here is the SQL code needed to create it:
/*
drop database if exists cs2803;
create database cs2803;
use cs2803;
create table users(username varchar(64) primary key not null, password varchar(64) not null);
*/

// NOTE you may have to change password to match your mySQL password
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "buzzbuzz123",
    database: "cs2803"
})
conn.connect(function(err) { // establishes connection
    if (err) {
        console.log("There was a mySQL error: ", err);
    } else {
        console.log("Connected to mySQL database");
    }
});

// create an instance of express web server
const app = express();
// directs express to use index.html file
app.use(express.static("public"));

// route for the home page
app.get("/main", function(req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

// route for the register page
app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/public/" + "register.html");
});

// route for the login page
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
});

// tells express to parse JSON data in POST requests
app.use(express.urlencoded({extended: false}));

// POST method for signing up
app.post("/attempt_register", function(req, res) {
    usernameQuery = "select username from users where username = ?"; // SQL statement
    conn.query(usernameQuery, [req.body.username], function(err, rows) { // queries SQL statement with username as the ? value
        if (err) {
            res.json({success: false, message: "server error"})
        }
        if (rows.length > 0) { // if the username was already found
            res.json({success: false, message: "username taken"})
        } else { // otherwise create the user
            passwordHash = bcrypt.hashSync(req.body.password, costFactor); // encrypts the password
            insertUser = "insert into users values(?, ?)" // SQL statement
            conn.query(insertUser, [req.body.username, passwordHash], function(err, rows) { // stores username and password
                if (err) {
                    res.json({success: false, message: "server error"})
                } else {
                    res.json({success: true, message: "user registered"})
                }
            });
        }
    });
});

// POST method for logging in
app.post("/attempt_login", function(req, res){
    conn.query("select password from users where username = ?", [req.body.username], function (err, rows){ // SQL query
        if (err) {
            res.json({success: false, message: "Sorry, we couldn't find a user with that username."});
        } 
        if (rows.length < 1) {
            res.json({success: false, message: "Sorry, we couldn't find a user with that username."});
        } else {
            storedPassword = rows[0].password // gets the hashed password that was stored in the SQL database
            if (bcrypt.compareSync(req.body.password, storedPassword)){ // checks the plaintext with the hash using scary math
                authenticated = true; // set the user to be logged in (currently doesn't actually do anything)
                res.json({success: true, message: "Successfully logged in!"});
            } else {
                res.json({success: false, message:"Wrong password bozo!"});
            }
        }
    });
});

// starts the express web server
app.listen(3000, function() {
    console.log("Listening on port 3000...");
});