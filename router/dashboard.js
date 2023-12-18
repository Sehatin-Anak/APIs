const express = require("express");
const authorization = require("../middleware/authorization");
const {
  getRecomend,
  getUniqueRecom,
} = require("../controller/foodRecomController");
const {
  getAllArticle,
  getUniqueArticle,
} = require("../controller/articleController");
const search = require("../controller/searchController");
const router = express.Router();

router.post("/user/:userId/dashboard/foodRecomend", authorization, getRecomend);

router.get("/dashboard/foodRecomend/:id", authorization, getUniqueRecom);

router.get("/dashboard/article", authorization, getAllArticle);

router.get("/dashboard/article/:id", authorization, getUniqueArticle);

// router.post("/dashboard/article/create", authorization, createArticle);

router.get("/dashboard/search", authorization, search);

module.exports = router;
