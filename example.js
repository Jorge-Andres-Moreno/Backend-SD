// Get our dependencies
var express = require('express');
var app = express();
//var mysql = require("mysql");

var port = process.env.PORT || 8080;

const con = mysql.createConnection({

  //host: process.env.ENDPOINT,
  host: "192.168.56.3",
  user: "root",
  password: "password",
  database: "mydb"
});

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the buycars API endpoint
app.get('/buycars', function(req, res){
  con.query('SELECT * FROM vehicles', (err,vehicles) => {
     if(err) throw err;
     res.json(vehicles);
   });
 
 })

// Implement the vehicles API endpoint
app.get('/vehicles', function(req, res){
  con.query('SELECT * FROM vehicles', (err,vehicles) => {
    if(err) throw err;
    res.json(vehicles);
  });
})

// Implement the support API endpoint
app.get('/support', function(req, res){
  con.query('SELECT * FROM support', (err,support) => {
    if(err) throw err;
    res.json(support);
  });
})

// Implement the pending reviews API endpoint

// Implement Experiencia AIK

// Implement the publicidad API endpoint
app.get('/publicidad', function(req, res){

  con.query('SELECT * FROM publicidad', (err,publicidad) => {
    if(err) throw err;
    res.json(publicidad);
  });
})

// Implement the innovacion API endpoint
app.get('/innovacion', function(req, res){
  con.query('SELECT * FROM innovacion', (err,innovacion) => {
    if(err) throw err;
    res.json(innovacion);
  });
})

// Implement the redsocial API endpoint
app.get('/redsocial', function(req, res){
  var redsocial = [
    {nombre : 'Facebook', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/240px-Facebook_Logo_%282019%29.png', enlace: 'https://www.facebook.com/'},
    {nombre: 'Instagram', imagen: 'https://www.instagram.com/static/images/ico/xxhdpi_launcher.png/99cf3909d459.png', enlace: 'https://www.instagram.com/'},
    {nombre: 'Twitter', imagen: 'https://cdn.icon-icons.com/icons2/1907/PNG/512/iconfinder-twitter-4555883_121368.png', enlace: 'https://www.twitter.com/'}
  ]
  res.json(redsocial);
})

console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(port);
module.exports = app;