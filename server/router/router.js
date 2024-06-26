const Router = require('express')
const router = Router()
const promiseRouter = require('.//promiseRouter')
const userRouter = require('.//userRouter')

router.use('/user', userRouter)
router.use('/promise', promiseRouter)

module.exports = router