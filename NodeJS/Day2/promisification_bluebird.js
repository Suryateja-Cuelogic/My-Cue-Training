"use strict";

var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("test1.txt", "utf-8")
    .then(function(contents) {
        console.log(contents);
        fs.appendFileAsync("test1.txt", "Appending the file \n");
        return fs.readFileAsync("test1.txt", "utf-8");
    })
    .then(function(appendContents) {
        console.log("------------------------")
        console.log(appendContents);
    })
    .catch(function(error) {
        console.log(error);
    });
