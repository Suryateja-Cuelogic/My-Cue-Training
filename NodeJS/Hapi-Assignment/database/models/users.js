"use strict";

var mongoose = require("mongoose");

var schema = {

	firstName : {
		type: String,
		required: true
	},

	lastName : {
		type: String,
		required: true
	},

	userName : {
		type: String,
		required: true
	}

	password : {
		type: String,
		required: true
	},

	lastLoginOn : {
		type: Date,
		default: null
	},

	createdOn: {
		type: Date,
		default: null
	}
};

var mongooseSchema = new mongoose.Schema(schema);

mongooseSchema.pre("save", function(next){

	var now = new Date();

    if (!this.createdOn) {
        this.createdOn = now;
    }

	next();
});

mongoose.model("Users", mongooseSchema);

