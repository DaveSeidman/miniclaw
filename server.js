'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);

server.listen(80);
app.use(express.static('html'));

console.log("server running on port 3000");
