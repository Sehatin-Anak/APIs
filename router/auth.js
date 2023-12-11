// 
// *****Code ini buat percobaan jwt aja*****
// *****Implementasi authnya tetep pake firebase*****
// 

const express = require('express')
const router = express.Router()
const auth = require('../controller/authController')

// Route for authentication

router.post('/register', auth.register)

router.post('/login', auth.login)

module.exports = router