"use strict";

var jwt = require("jsonwebtoken"),
    boom = require("boom");

var server = require("../app");

var security = require("../utility/security");

server.auth.scheme("jwt-auth", jwtTokenAuthentication);
server.auth.strategy("Simple", "jwt-auth");

function jwtTokenAuthentication(server) {

    return {
        authenticate: function(request, reply) {

            if (typeof request.headers.authorization === "undefined" || request.headers.authorization.length <= 0) {
                return reply(boom.badData("Token is missing."));
            } else {
                
                security.verifyToken(request.headers.authorization)
                    .then(function(decoded) {

                        reply.continue({
                            credentials: decoded
                        });
                    })
                    .catch(function(err) {

                        return reply(boom.badData("Invalid token."));
                    });
            }
        }
    }
}
