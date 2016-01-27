var hapi = require("hapi");

var server = new hapi.Server();

server.connection({
	host: "localhost",
	port: 7000
});

server.route({
	method: "GET",
	path: "/",
	handler: function(request, reply){
		reply("Hello, Welcome to Hapi world.")
	}
});

server.start();