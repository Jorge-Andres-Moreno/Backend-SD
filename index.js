var http = require('http');
var express = require('express');
var path = require('path');

var port = process.env.PORT || 8080;

var app = express();

app.get('/users', function (req, res) {
    console.log('GET="/example"');
    res.status(200).send('success')
});

app.post('/user/add', function (req, res) {
    console.log('POST="/example"');
    res.status(200).send('success')
});

http.createServer(app).listen(port);