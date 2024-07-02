const Router = require('express')
const router = Router()
const authController = require('../controller/authController')
const path = require('path')
const passport = require('../utils/passport/passport');

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset/:token', authController.resetPassword)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback)

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), authController.facebookCallback)

router.get('/logout', authController.logout)

router.get('/login',(req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'form.html'));
});


module.exports = router