/*
* I tried to create a promise like below.
* But when i try to execute, I am having the error as 
* "resolve" method not defined. Could you please look into this.
*/


function Promise(fn) {
    var callback = null;
    this.then = function(cb) {
        callback = cb;
    }

    function resolve(value) {
        callback(value);
    }

    fn(resolve);
}

function square(num) {
    return new Promise(function(num) {
        resolve(num * num);
    });
}

console.log(square(5));

