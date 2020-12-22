#!/usr/bin/env node

// Declare our dependencie
var http = require("http");
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

//Conection BD
var con = mysql.createConnection({
  host: process.env.DB_HOST || "database-talentum.ddns.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "test"
});

con.connect(function (err) {
 if (err) throw err;
  console.log("Connected!");
  
  var sql = "DROP TABLE users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
  
  var sql = "CREATE TABLE users ( id VARCHAR(2550), nombre VARCHAR(2550) )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

//Define PORT
var port = process.env.PORT_BACKEND || 8080;

//Initialize express
var app = express();

//Define parse of objects that are receive and send
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/users/list", function (req, res) {
  console.log('GET="/users"');
  con.query("SELECT * FROM users; ", function (err, result) {
    if (err) throw err;
    var data = { users: [] };
    data.users = result;
    res.status(200).send(data);
  });
});

app.put("/users/add", function (req, res) {
  console.log('PUT="/user/add"');
  var sql =
    "INSERT INTO users VALUES (uuid(), '" + req.body.nombre + "');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send({msg : "success"});
  });
});

app.post("/users/update", function (req, res) {
  console.log('POST="/user/update"');
  var sql =
    "UPDATE users SET nombre='" +req.body.nombre +"' WHERE id='"+req.body.id+"';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send({msg : "success"});
  });
});

app.delete("/users/delete", function (req, res) {
  console.log('DELETE="/user/delete"');  
  var sql =
    "DELETE FROM users WHERE id='" +req.body.id +"';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send({msg : "success"});
  });
});

http.createServer(app).listen(port);
