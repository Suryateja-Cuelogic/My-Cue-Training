"use strict";

var fs = require("fs");

setTimeout(function() {
    fs.rename('hello', 'world', function(err) {
        if (err) throw err;
        console.log("File renamed successfully")
        fs.stat('world', function(err, stats) {
            if (err) throw err;
            console.log(stats);
        });
    });
}, 2000);
