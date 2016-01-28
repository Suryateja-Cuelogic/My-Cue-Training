"use strict";

var promise = require("bluebird"),
    bcrypt = promise.promisifyAll(require("bcrypt")),
    mongoose = require("mongoose");

var userModel = mongoose.model("Users");

module.exports = {
    matchCredentials: matchCredentials
};

function matchCredentials(username, password) {

    return new promise(function(resolve, reject) {

        var pocket = {};

        pocket.user = null;
        pocket.isUsernameValid = false;
        pocket.isPasswordValid = false;

        userModel.findOne({
                "username": username,
            })
            .lean()
            .execAsync()
            .then(function(user) {

                if (user) {
                    pocket.isUsernameValid = true;
                    pocket.user = user;
                }
            })
            .then(function() {

                if (pocket.isUsernameValid) {

                    if (pocket.user.password !== null && pocket.user.password.length > 0) {
                        return bcrypt.compareAsync(password, pocket.user.password);
                    }
                }
            })
            .then(function(isMatch) {

                if (isMatch === true) {
                    pocket.isPasswordValid = true;
                }
            })
            .then(function() {

                if (pocket.isUsernameValid && pocket.isPasswordValid) {
                    return resolve(pocket.user);
                } else {
                    return resolve(false);
                }
            })
            .catch(function(err) {
                return reject(err);
            });
    });
}