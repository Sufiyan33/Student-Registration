const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const mysql = require("mysql2");
const cors = require('cors'); //import cors module

/*Enable CORS for all routes, 
    if you want you can restric only for your request like below:
*/
server.use(cors({
    origin: 'http://localhost:4200'
}));
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
server.post("/api/student", (req, res) =>{
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

// view all data.
server.get("/api/student", (req, res) =>{
    let sql = "SELECT * FROM student";
    db.query(sql, function(error, result){
        if(error){
            console.log("Error connecting to DB...", error);
        }else{
            res.send({status : true, data: result});
        }
    });
});

// search record by id.
server.get("/api/student/:id", (req, res) =>{
    var id = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + id;
    db.query(sql, function(error, result){
        if(error){
            console.log("Error occured connecting DB...", error);
        }else{
            res.send({
                status: true, data: result
            });
        }
    });
});

// Update record by id.
server.put("/api/student/:id", (req, res) =>{
    let sql = "UPDATE student SET name='" + 
    req.body.name + 
    "', course='" +
    req.body.course +
    "', fees='" + 
    req.body.fees + 
    "' WHERE id=" +
    req.params.id;

    db.query(sql, (error, result) =>{
        if(error){
            res.send({status: false, message: "Data updation failed...", error});
        }else{
            res.send({status: true, message: "Record updated successfully...", data: result});
        }
    });
});

// Deleting record by id.
server.delete("/api/student/:id", (req, res) =>{
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    db.query(sql, (error) =>{
        if(error){
            res.send({status: false, message: "Deletion has been failed...", error});
        }else{
            res.send({status: true, message: "Reocrd has been deleted..."})
        }
    });
})