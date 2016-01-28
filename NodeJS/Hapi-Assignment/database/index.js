"use strict";

var mongoose = require("mongoose"),
	requireDir = require('require-directory');

exports.models = requireDir(module, './models');

mongoose.connect("mongodb://" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DATABASE, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD
});

mongoose.connection.on("error", function() {
	console.log("Failed to connect database.")
});

mongoose.connection.once("open", function(){
	console.log("Database connection established.");
});


