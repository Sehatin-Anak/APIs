const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const { create } = require('../controller/bioChildController')
const router = express.Router()

router.post('/bioChild', verifyToken, create)

module.exports = router