"use strict";

var promise = require("bluebird"),
    mongoose = promise.promisifyAll(require("mongoose")),
    moment = require("moment");

var usersModel = mongoose.model("Users"),
    usersActivityModel = mongoose.model("UsersActivity");

module.exports = {
    fetchUserDetails: fetchUserDetails,
    fetchAllUsers: fetchAllUsers,
    updateUserDetails: updateUserDetails,
    fetchInactiveUsers: fetchInactiveUsers
}

function fetchUserDetails(request, reply) {

    reply.data = {
        "userDetails": reply.data.userDetails,
        "message": "User Found"
    }

    reply.next();
}

function fetchAllUsers(request, reply) {

    reply.data = {
        "usersData": reply.data.usersData,
        "message": "Users Available"
    }

    reply.next();
}

function updateUserDetails(request, reply) {

    var userDynamicSet = {
        $set: {}
    };

    if (request.params.userId == reply.data.userDetails._id) {

        if (typeof request.payload.username !== "undefined") {
            userDynamicSet.$set["username"] = request.payload.username;
        }

        if (typeof request.payload.firstName !== "undefined") {
            userDynamicSet.$set["firstName"] = request.payload.firstName;
        }

        if (typeof request.payload.lastName !== "undefined") {
            userDynamicSet.$set["lastName"] = request.payload.lastName;
        }

        usersModel.findByIdAndUpdateAsync(request.params.userId,
                userDynamicSet
            )
            .then(function(userData) {

                if (!userData) {
                    return promise.reject("Unable to update user data");
                }

                reply.data = {
                    "message": "User data updated successfully."
                }

                reply.next();

            })
            .catch(function(err) {
                reply.next(err);
            })
    }
}

function fetchInactiveUsers(request, reply) {

    var startdate = moment().subtract(3, "days");

    usersActivityModel.find({}/*{
            $group: {
                _id: "$user",
                lastLoginDate: {
                    $max: "$date"
                }
            }
        }, {
            $match: {
                lastLoginDate: {
                    $lte: new Date(startdate)
                }
            }
        }*/)
    	.populate("user", "username firstName lastName")
    	.lean()
        .execAsync()
        .then(function(users) {
            reply.data = {
                users: users,
                startdate: startdate
            }
            reply.next()
        })
        .catch(function(err) {

            reply.next(err)
        });

}
