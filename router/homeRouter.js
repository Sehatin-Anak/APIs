const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

// for testing token expired

router.get('/home', verifyToken, async (req, res) => {
    res.status(200).json({
        message: `welcome ${req.user?.username}`
    })
})

module.exports = router