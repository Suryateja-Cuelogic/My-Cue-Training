"use strict";

var promise = require("bluebird"),
    mongoose = promise.promisifyAll(require("mongoose")),
    bcrypt = promise.promisifyAll(require("bcrypt"));

var usersModel = mongoose.model("Users"),
    userActivityModel = mongoose.model("UsersActivity");

module.exports = {
    userSignup: userSignup,
    userLogin: userLogin
}

function userSignup(request, reply) {

    var userObj = {};

    bcrypt.hashAsync(request.payload.password, parseInt(process.env.SALT_WORK_FACTOR))
        .then(function(hashedPassword) {

            if (!hashedPassword) {
                return promise.reject("User signup failed. Please retry.");
            }

            userObj = {
                "username": request.payload.username,
                "password": hashedPassword,
                "firstName": request.payload.firstName,
                "lastName": request.payload.lastName
            };

            var newUser = new usersModel(userObj);
            return newUser.saveAsync();
        })
        .then(function(user) {

            if (!user) {
                return promise.reject("User signup failed. Please retry.");
            }

            reply.data = {
                "message": "Your account has been created."
            };
            reply.next();

        })
        .catch(function(err) {
            return reply.next(err);
        });
}

function userLogin(request, reply) {

    if (reply.data) {

        var userActivityObj = {};

        userActivityObj = {
            user: reply.data.user._id,
            ip: request.info.remoteAddress,
            userAgent: request.headers['user-agent']
        };

        var newUserActivity = new userActivityModel(userActivityObj);
        newUserActivity.saveAsync();

        reply.data = {
        	message: "Logged in successfully"
        }
        
        reply.next();
    }

}
