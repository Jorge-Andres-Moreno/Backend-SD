#!/usr/bin/env node

// Declare our dependencie
var http = require("http");
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

//Conection BD
var con = mysql.createConnection({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "*",
  database: process.env.DB_NAME || "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//Define PORT
var port = process.env.PORT || 8081;

//Initialize express
var app = express();

//Define parse of objects that are receive and send
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/users", function (req, res) {
  console.log('GET="/users"');
  con.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    var data = { users: [] };
    data.users = result;
    res.status(200).send(data);
  });
});

app.post("/user/add", function (req, res) {
  console.log('POST="/user/add"');
  var sql =
    "INSERT INTO users VALUES ('" +
    req.body.id +
    "', '" +
    req.body.nombre +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send("success");
  });
});

http.createServer(app).listen(port);
