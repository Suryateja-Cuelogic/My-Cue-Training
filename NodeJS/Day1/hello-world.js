var http = require("http"),
    server;

var server = http.createServer(function(req, res) {
	res.end("Hello World");
});

server.listen(7000);