const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const { getArticleBookmark, bookmarkFoodRecom, getFoodRecomBookmark, bookmarkArticle, deleteBookmarkedArticle, deleteBookmarkedFoodRecom } = require('../controller/bookamarkController')

router.get('/user/:id/bookmark/article', authorization, getArticleBookmark)

router.get('/user/:id/bookmark/recipe', authorization, getFoodRecomBookmark)

router.post('/user/:userId/bookmark/article/:id', authorization, bookmarkArticle)

router.post('/user/:userId/bookmark/recipe/:id', authorization, bookmarkFoodRecom)

router.delete('/user/:userId/bookmark/article/:id', authorization, deleteBookmarkedArticle)

router.delete('/user/:userId/bookmark/recipe/:id', authorization, deleteBookmarkedFoodRecom)

module.exports = router
