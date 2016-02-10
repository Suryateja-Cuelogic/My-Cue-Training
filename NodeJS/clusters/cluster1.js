var cluster = require("cluster"),
    numCPUs = require('os').cpus().length,
    hapi = require("hapi");

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        console.log("I am running with ID : " + cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {

	var server = new hapi.Server();

	server.connection({
		host: "localhost",
		port:3000
	});

	server.start(function(data){
		console.log("Sever running at " + server.info.uri)
	});
}
