"use strict";

var fs = require("fs");

fs.appendFile("hworld", "/n What are you doing ?", function(err) {
    if (err) throw err;
    console.log("File appended successfully");
});
