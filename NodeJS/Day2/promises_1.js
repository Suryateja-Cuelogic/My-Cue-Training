function getSquare(num) {

    return {
        then: function(callback) {

            callback(num * num);
        }
    }
}

getSquare(4)
    .then(function(result) {
        console.log("Your square number is: " + result);
    });
