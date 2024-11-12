const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mysql = require("mysql");
server.use(bodyParser.json());

//Db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dataFront",
});
