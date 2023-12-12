const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const { getBookmark, createBookmark, deleteBookmark } = require('../controller/bookamarkController')

router.get('/bookmark', authorization, getBookmark)

router.post('/bookmark/create/:id', authorization, createBookmark)

router.delete('/bookmark/delete/:id', authorization, deleteBookmark)

module.exports = router