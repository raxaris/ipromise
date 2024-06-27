const Router = require('express')
const router = Router()
const authController = require('../controller/authController')
const path = require('path')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset/:token', authController.resetPassword)

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'form.html'));
});



module.exports = router