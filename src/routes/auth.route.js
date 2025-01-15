const { registerController, loginController } = require('../controller/auth.controller')

const router = require('express').Router()

/**
 * Authorization
 */
router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router