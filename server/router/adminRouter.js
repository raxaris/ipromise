const Router = require('express')
const router = Router()
const userController = require('../controller/userController')
const promiseController = require('../controller/promiseController')
const commentController = require('../controller/commentController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.use(roleMiddleware("ADMIN"));
//user
router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)
//promise
router.post('/promises', promiseController.createPromise)
router.get('/promises', promiseController.getAllPromises)
router.get('/promises/:id', promiseController.getPromiseByID)
router.put('/promises/:id', promiseController.updatePromise)
router.delete('/promises/:id', promiseController.deletePromise)

router.post('/comments', commentController.createComment)
router.get('/comments', commentController.getAllComments)
router.get('/comments/:id', commentController.getCommentByID)
router.put('/comments/:id', commentController.updateComment)
router.delete('/comments/:id', commentController.deleteComment)

module.exports = router