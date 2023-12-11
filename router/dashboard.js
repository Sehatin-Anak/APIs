const express = require("express");
const authorization = require("../middleware/authorization");
const getRecomend = require("../controller/foodRecomController");
const {
  getArticle,
  createArticle,
} = require("../controller/articleController");
const search = require("../controller/searchController");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/dashboard/foodRecomend", authorization, getRecomend);

router.get("/dashboard/article", authorization, getArticle);

router.post("/dashboard/article/create", createArticle);

router.get("/dashboard/search", authorization, search);

module.exports = router;
