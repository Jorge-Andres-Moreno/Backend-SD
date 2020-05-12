var http = require('http');
var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

app.get('/users', function (req, res) {
    console.log('GET="/users"');
    res.status(200).send({users:[{"id" : "1","nombre" : "Jorge"},{"id" : "2","nombre" : "Felipe"},{"id" : "3","nombre" : "Otro"}]})
});

app.post('/user/add', function (req, res) {
    console.log('POST="/user/add"');
    res.status(200).send('success')
});

http.createServer(app).listen(port);