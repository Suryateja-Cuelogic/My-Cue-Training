var fs = require("fs"),
    child_process = require("child_process");

/*child_process.exec("node file-moved1.js", function(error, stdout, stderr) {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
});
*/

for (var i = 0; i < 3; i++) {

    var workerProcess = child_process.exec('node file1.js ' + i, function(error, stdout, stderr) {

        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });

    workerProcess.on('close', function(code) {
        console.log('Child process exited with exit code ' + code);
    });
}
