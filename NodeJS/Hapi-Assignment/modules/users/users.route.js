"use strict";

var series = require("hapi-next"),
    joi = require("joi"),
    validator = require("./users.validator.js"),
    controller = require("./users.controller.js");

module.exports = {

    fetchUser: {
        method: 'GET',
        path: '/user/{userId}',
        config: {
            auth: "Simple",
            description: "Fetch user details with user id",
            validate: {
                params: {
                    userId: joi.string().required()
                }
            }
        },
        handler: function(request, reply) {

            var functionSeries = new series([
                validator.fetchUserDetails,
                controller.fetchUserDetails
            ]);

            functionSeries.execute(request, reply);
        }
    },

    fetchAllUsers: {
        method: 'GET',
        path: '/users',
        config: {
            //auth: "Simple",
            description: "Fetches all user details."
        },
        handler: function(request, reply) {

            var functionSeries = new series([
                validator.fetchAllUsers,
                controller.fetchAllUsers
            ]);

            functionSeries.execute(request, reply);
        }
    },

    updateUser: {
        method: 'PUT',
        path: '/user/details/update/{userId}',
        config: {
            auth: "Simple",
            description: "Update user details with user id",
            validate: {
                params: {
                    userId: joi.string().required()
                },
                payload: {
                	firstName: joi.string(),
                	lastName: joi.string(),
                	username: joi.string()
                }
            }
        },
        handler: function(request, reply) {

            var functionSeries = new series([
                validator.updateUserDetails,
                controller.updateUserDetails
            ]);

            functionSeries.execute(request, reply);
        }
    },

    fetchNotLoggedUsers: {
        method: 'GET',
        path: '/users/inactive',
        config: {
            auth: "Simple",
            description: "Fetches all user details who have not logged in since last 5 days."
        },
        handler: function(request, reply) {

            var functionSeries = new series([
                validator.fetchAllUsers,
               // validator.fetchInactiveUsers,
                controller.fetchInactiveUsers
            ]);

            functionSeries.execute(request, reply);
        }
    }
}
