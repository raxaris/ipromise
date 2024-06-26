const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }
    try{
        const token = req.session.token;
        if(!token){
            return res.status(403).json({status: "error", message: "Unauthorized"});
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedData
        next();
    } catch (e){
        return res.status(401).json({message: "Unauthorized"})
    }
}