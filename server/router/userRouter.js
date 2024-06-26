const Router = require('express')
const router = Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const path = require('path')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'form.html'));
});


const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken')
router.get('/token', (req, res, next) => {
    try {
        const token = req.session.token;
        if(!token){
            return res.status(403).json({status: "error", message: "Unauthorized"});
        }

        const decodeData = jwt.verify(token, process.env.SECRET_KEY);

        res.json(decodeData);
    } catch (error) {
        next(error);
    }
});


module.exports = router