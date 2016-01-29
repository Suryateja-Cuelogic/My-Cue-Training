"use strict";

var promise = require("bluebird"),
    mongoose = promise.promisifyAll(require("mongoose"));

var usersModel = mongoose.model("Users");

var security = require("../../utility/security");

module.exports = {
    userSignup: userSignup,
    userLogin: userLogin
}

function userSignup(request, reply) {

    usersModel.findOneAsync({
            "username": request.payload.username
        })
        .then(function(user) {

            if (user) {
                return promise.reject("Your account already exists, Try with another username.");
            } else {
                reply.next();
            }
        })
        .catch(function(err) {
            reply.next(err);
        })
}

function userLogin(request, reply) {

    security.matchCredentials(request.payload.username, request.payload.password)
        .then(function(user) {

            if (!user) {
                return promise.reject("Incorrect username or password.");
            }          

            reply.data = {
                "user": user
            };
            reply.next();
        })
        .catch(function(err) {
            return reply.next(err);
        });
}
