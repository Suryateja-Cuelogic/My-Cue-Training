var http = require("http"),
    server;

var server = http.createServer(function(req, res) {
    res.end("Hello World");
});

function add(x, y) {
	return x+y;
}

server.listen(5000);
