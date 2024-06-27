const Router = require('express')
const router = Router()
const promiseRouter = require('./promiseRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/promise', promiseRouter)

module.exports = router