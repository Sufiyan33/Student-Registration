const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mysql = require("mysql2");
server.use(bodyParser.json());

//Db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "datafront",
});

// try to connect with DB & execute command: node server.js
db.connect(function (error) {
    if(error){
        console.log("Error connecting to DB...", error)
    }else{
        console.log("DB Connected successfully...")
    }
})