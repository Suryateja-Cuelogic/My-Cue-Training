"use strict";

var promise = require("bluebird"),
    bcrypt = promise.promisifyAll(require("bcrypt")),
    mongoose = require("mongoose"),
    redis = require("redis"),
    redisClient = promise.promisifyAll(redis.createClient()),
    jwt = promise.promisifyAll(require("jsonwebtoken"));

var userModel = mongoose.model("Users");

module.exports = {
    matchCredentials: matchCredentials,
    createToken: createToken,
    verifyToken: verifyToken
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

function createToken(userPayloadData) {

    var keyToken,
        authToken,
        secretKey = process.env.TOKEN_SECRET;

    keyToken = jwt.sign(userPayloadData, secretKey);
    userPayloadData.coreToken = keyToken;

    authToken = jwt.sign(userPayloadData, secretKey);

    redisClient.HMSET(keyToken, userPayloadData);

    delete userPayloadData.coreToken;

    return authToken;
}

function verifyToken(token) {

    return new promise(function(resolve, reject) {

        if (!token) {
            return reject("Token could not be verified.");
        }

        var pocket = {};
        pocket.isTokenDecoded = false;
        pocket.isCoreTokenExist = false;
        pocket.decoded = null;

        jwt.verifyAsync(token, process.env.TOKEN_SECRET)
            .then(function(decoded) {

                if (decoded && decoded.coreToken) {
                    pocket.isTokenDecoded = true;
                    pocket.decoded = decoded;
                    return redisClient.HSCANAsync(decoded.coreToken, 0);
                }
            })
            .then(function(credentials) {

                if (credentials && credentials[1].length !== 0) {
                    pocket.isCoreTokenExist = true;
                }
            })
            .then(function() {

                if (pocket.isTokenDecoded && pocket.isCoreTokenExist) {
                    delete pocket.decoded.coreToken;
                    return resolve(pocket.decoded);
                } else {
                    return reject("Invalid token.");
                }
            })
            .catch(function(err) {

                log.write(err);
                return reject(err);
            });
    });
}
