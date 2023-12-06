const express = require('express')
const router = express.Router()
const auth = require('../controller/authController')

// Route for authentication

router.post('/register', auth.register)

router.post('/login', auth.login)

router.post('/refresh-token', auth.refreshToken)

module.exports = router