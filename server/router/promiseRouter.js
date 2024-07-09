const Router = require('express')
const router = Router()
const promiseController = require('../controller/promiseController')

router.post('/', promiseController.createPromise)
router.get('/', promiseController.getAllPromises)
router.get('/:id', promiseController.getPromiseByID)

module.exports = router