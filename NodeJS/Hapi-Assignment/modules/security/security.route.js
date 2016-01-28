"use strict";

var series = require("hapi-next"),
    joi = require("joi"),
    validator = require("./security.validator.js"),
    controller = require("./security.controller.js");

module.exports = {

    userSignup: {
        method: "POST",
        path: "/user/signup",
        config: {
            description: "User Signup",
            validate: {
                payload: {
                    firstName: joi.string().required(),
                    lastName: joi.string().required(),
                    username: joi.string().email().required(),
                    password: joi.string().min(6).required()
                }
            },
            handler: function(request, reply) {

                var functionSeries = new series([
                    validator.userSignup,
                    controller.userSignup
                ]);

                functionSeries.execute(request, reply);
            }
        }

    },

    userLogin: {
        method: "POST",
        path: "/user/login",
        config: {
            description: "User login",
            validate: {
                payload: {
                    username: joi.string().email().required(),
                    password: joi.string().min(6).required()
                }
            },
            handler: function(request, reply) {

                var functionSeries = new series([
                    validator.userLogin,
                    controller.userLogin
                ]);

                functionSeries.execute(request, reply);
            }
        }

    }
};
