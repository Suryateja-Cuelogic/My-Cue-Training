"use strict";

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/usersinfo");

mongoose.connection.on("error", function() {
	console.log("Failed to connect database.")
});

mongoose.connection.once("open", function(){
	console.log("Database connection established.");
});


