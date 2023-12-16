const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const { getArticleBookmark, deleteBookmark, bookmarkFoodRecom, getRecipeBookmark, bookmarkArticle } = require('../controller/bookamarkController')

router.get('/bookmark/article', authorization, getArticleBookmark)

router.get('/bookmark/recipe', authorization, getRecipeBookmark)

router.post('/bookmark/create/article/:id', authorization, bookmarkArticle)

router.post('/bookmark/create/recipe/:id', authorization, bookmarkFoodRecom)

router.delete('/bookmark/delete/:id', authorization, deleteBookmark)

module.exports = router