"use strict";

var http = require("http"),
    langs = require("./module-learning");

var server = http.createServer(function(req, res) {
    res.write("I am learning " + langs.learningEnglish());
    res.write("I am learning " + langs.learningHindi());
    res.end("I am learning " + langs.learningGerman());
});

server.listen(7000);
