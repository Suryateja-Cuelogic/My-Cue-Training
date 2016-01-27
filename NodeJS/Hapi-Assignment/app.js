"use strict";

var hapi = require("hapi");

var server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 7000
});

require("./database");

server.start(function() {
    console.log("Server started at " + server.info.uri);
});
