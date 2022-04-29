// set up node requirements
const express = require("express");
const res = require("express/lib/response");
const {json} = require("express/lib/response");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
var request = require('request');

const axios = require('axios');
const { Server } = require("http");
const { application } = require("express");



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
app.use(express.static("public", {index: 'home.html'}));

var http = require("http").createServer(app);


// route for the home page
app.get("/home", function(req, res) {
    res.sendFile(__dirname + "/public/" + "home.html");
});


// route for the register page
app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/public/" + "register.html");
});

// route for the login page
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
    authenticated = false;
});

//route for buy page
app.get("/buy", function(req, res) {
    res.sendFile(__dirname + "/public/" + "buy.html")
})

// route for the conversation
const io = require('socket.io')(http);

app.get("/conversation", function(req, res) {
    res.sendFile(__dirname + "/public/" + "conversation.html");
});

app.post("/logged_in", function(req, res) {
    if (authenticated) {
        res.json({message: "Log Out"});
    } else {
        res.json({message: "Login"});
    }
})


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
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
                authenticated = true; // set the user to be logged in
                res.json({success: true, message: "Successfully logged in!"});
            } else {
                res.json({success: false, message:"Wrong password bozo!"});
            }
        }
    });
});

//api implementation
app.get('/convert', (req,res) => {

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            interval: '1min',
            function: 'TIME_SERIES_INTRADAY',
            symbol: 'AAPL',
            datatype: 'json',
            output_size: 'compact'
        },
        headers: {
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
          'X-RapidAPI-Key': '46696ad4camshc8033d999dc306cp1a477bjsn517c39425609'
        }
      };

      axios.request(options).then(function (response) {
        let datas = response.data['Time Series (1min)'];
        var value = Object.values(datas)[0];
        res.json(value);
    }).catch(function (error) {
        console.error(error);
    });
      
      /*axios.request(options).then(function (response) {
          var datas = JSON.parse(JSON.stringify(response.data))
          var ret = datas['Time Series (1min)'][0]
          res.json(ret);
      }).catch(function (error) {
          console.error(error);
      });*/
    
});

// starts the express web server
http.listen(3000, function() {
    console.log("Listening on port 3000...");
});