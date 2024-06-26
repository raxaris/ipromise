const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const ApiError = require("../error/apiError");
module.exports = function (roles) {
    return function(req, res, next){
        if (req.method === "OPTIONS"){
            next();
        }

        try{
            const token = req.session.token;
            if(!token){
                return next(ApiError.badRequest("Invalid token"))
            }

            const {roles: userRoles} = jwt.verify(token, secret);

            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            });

            if(!hasRole){
                return next(ApiError.forbidden("Not enough privileges"))
            }
            next();
        } catch (e){
            console.log(e);
            return res.status(403).json({status: "error", message: "Unauthorized"});
        }
    }
}