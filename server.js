const express = require("express");
const res = require("express/lib/response");
const {json} = require("express/lib/response");
const bcrypt = require("bcryptjs");
const costFactor = 11;
let authenticated = false;
const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "buzzbuzz123",
    database: "cs2803"
})

conn.connect(function(err) {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("Connected to database");
    }
});

const app = express();

let user = "user";
let pass = "pass";

app.use(express.static("public"));

app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/public/" + "register.html");
});

app.use(express.urlencoded({extended: false}));

app.post("/register", function(req, res) {
    usernameQuery = "Select username from users where username = ?";
    conn.query(usernameQuery, [req.body.username], function(err, rows) {
        if (err) {
            res.json({success: false, message: "server error"})
        }

        if (rows.length > 0) {
            res.json({success: false, message: "username taken"})
        } else {
            passwordHash = bcrypt.hashSync(req.body.password, costFactor);
            insertUser = "insert into Users values(?, ?)"
            conn.query(insertUser, [req.body.username, passwordHash], function(err, rows) {
                if (err) {
                    res.json({success: false, message: "server error"})
                } else {
                    res.json({success: true, message: "user registered"})
                }
            })
        }
    });
})



app.post("/attempt_login", function(req, res){
    // we check for the username and password to match.
    conn.query("select password from users where username = ?", [req.body.username], function (err, rows){
        if (err) {
            res.json({success: false, message: "user doesn't exists"});
        } else {
            storedPassword = rows[0].password // rows is an array of objects e.g.: [ { password: '12345' } ]
            // bcrypt.compareSync let's us compare the plaintext password to the hashed password we stored in our database
            if (bcrypt.compareSync(req.body.password, storedPassword)){
                authenticated = true;
                res.json({success: true, message: "logged in"})
            } else {
                res.json({success: false, message:"password is incorrect"})
            }
        }
    })  
})

app.get("/main", function(req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.listen(3000, function() {
    console.log("Listening on port 3000...");
});