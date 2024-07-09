const Router = require('express')
const router = Router()
const profileController = require('../controller/profileController')

router.get('/:username', profileController.getUserProfile)

module.exports = router