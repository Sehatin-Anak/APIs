const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const { getRecomend } = require('../controller/foodRecomController')
const { getArticle } = require('../controller/articleController')
const router = express.Router()

router.get('dashboard/foodRecomend', verifyToken, getRecomend)

router.get('dashboard/article', verifyToken, getArticle)

module.exports = router