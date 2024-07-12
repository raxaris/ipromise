const Router = require('express')
const router = Router()
const promiseRouter = require('./promiseRouter')
const authRouter = require('./authRouter')
const adminRouter = require('./adminRouter')
const profileRouter = require('./profileRouter')
const jwt = require('jsonwebtoken')
const path = require("node:path");
const cookieParser = require("cookie-parser");

router.use('/auth', authRouter)
router.use('/promises', promiseRouter)
router.use('/admin', adminRouter)
router.use('/profiles', profileRouter)

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'form.html'));
})
router.get('/dashboard', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }
        res.send('Welcome to your dashboard');
    });
});

module.exports = router