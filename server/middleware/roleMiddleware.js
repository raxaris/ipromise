const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const ApiError = require("../utils/error/apiError");

module.exports = function (roles) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const token = req.cookies.jwt
            if (!token) {
                return next(ApiError.badRequest("Invalid token"));
            }

            const decodedData = jwt.verify(token, secret);
            const userRole = decodedData.role;

            if (!roles.includes(userRole)) {
                return next(ApiError.forbidden("Not enough privileges"));
            }

            req.user = decodedData;
            next();
        } catch (e) {
            console.log(e);
            next(ApiError.internal("Error getting user role"));
        }
    };
};