const express = require('express');
const bodyParser = require('body-parser');
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
});

// Now set port for listening
server.listen(8085, function(error){
    if(error) console.log("Error...", error);
    else console.log("Started on port: 8085")
});

// Post method
server.post("/api/student/add", (req, res) =>{
    let details = {
        name: req.body.name,
        course: req.body.course,
        fees: req.body.fees,
    };
    let sql = "INSERT INTO student SET ? ";
    db.query(sql, details, (error) =>{
        if(error){
            res.send({status: false ,message: "Student failed to create...", error});
        }else{
            res.send({status: true, message: "Student created successfully..."});
        }
    });
});
