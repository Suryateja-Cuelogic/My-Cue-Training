"use strict";

var Promise = require("bluebird");

function totalMarks(sub1, sub2, sub3) {

    return new Promise(function(resolve, reject) {

        var sum = sub1 + sub2 + sub3;

        if (typeof sum === "number") {
            resolve("The total average is : " + sum / 3);
        } else {
            reject("Unable to calculate the sum.");
        }

    });
}

totalMarks(45, 63, 82)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
    	console.log(error);
    });

totalMarks(45, "63", 82)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
    	console.log(error);
    });

totalMarks(45, "", 82)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
    	console.log(error);
    });

totalMarks("sum", 63, 82)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
    	console.log(error);
    });

totalMarks(97, 63, 82)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
    	console.log(error);
    });

