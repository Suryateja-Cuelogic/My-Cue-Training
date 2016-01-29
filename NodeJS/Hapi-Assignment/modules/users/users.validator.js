"use strict";

var promise = require("bluebird"),
    mongoose = promise.promisifyAll(require("mongoose")),
    boom = require("boom");

var usersModel = mongoose.model("Users");

module.exports = {
    fetchUserDetails: fetchUserDetails,
    fetchAllUsers: fetchAllUsers,
    updateUserDetails: updateUserDetails
}

function fetchUserDetails(request, reply) {

    var userId = request.params.userId;

    usersModel.findOneAsync({
            "_id": userId
        }, "_id firstName lastName username")
        .then(function(user) {

            if (!user) {
                return promise.reject(boom.notFound("User not found."));
            }

            reply.data = {
                userDetails: user
            }

            reply.next();
        })
        .catch(function(err) {
            reply.next(err);
        })
}

function fetchAllUsers(request, reply) {

    usersModel.find({}, "_id firstName lastName username")
        .lean()
        .execAsync()
        .then(function(users) {

            if (!users || users.length === 0) {
                return promise.reject(boom.notFound("Users are not available."));
            }
            
            reply.data = {
                usersData: users
            }

            reply.next();
        })
        .catch(function(err) {
            reply.next(err);
        })
}

function updateUserDetails(request, reply) {

    var payloadObj = request.payload,
        userId = request.params.userId,
        userData;

    usersModel.findOne({
            "_id": userId
        }, "_id username")
        .lean()
        .execAsync()
        .then(function(user) {

            userData = user;

            if (!user) {
                return promise.reject(boom.notFound("User not found."));
            }

            if (typeof payloadObj.username !== "undefined") {

                if (payloadObj.username !== user.username) {

                    return usersModel.findOneAsync({
                        "username": payloadObj.username
                    });
                }
            }
        })
        .then(function(userDetails) {

            if (typeof payloadObj.username !== "undefined" && userDetails) {
                return promise.reject("User with this username already exists.");
            }

            reply.data = {
                "userDetails": userData
            };

            reply.next();

        })
        .catch(function(err) {
            return reply.next(err);
        });
}
