const express = require("express");
const authorization = require("../middleware/authorization");
const {
  getRecomend,
  getUniqueRecom,
} = require("../controller/foodRecomController");
const {
  getAllArticle,
  createArticle,
  getUniqueArticle,
} = require("../controller/articleController");
const search = require("../controller/searchController");
const { datafromML } = require("../utils/utils");
const router = express.Router();
const axios = require("axios");
const modelApiUri = `${process.env.MODEL_API_URI}/generate_json`;
const fs = require("fs/promises");

router.post("/dashboard/foodRecomend", authorization, getRecomend);

router.get("/dashboard/foodRecomend/:id", authorization, getUniqueRecom);

router.get("/test/apimodel", async (req, res) => {
  const data = await datafromML()
  console.log(data)

  res.json({
    data
  })

  // const specific = data.
});

router.get("/dashboard/article", authorization, getAllArticle);

router.get("/dashboard/article/:id", authorization, getUniqueArticle);

router.post("/dashboard/article/create", authorization, createArticle);

router.get("/dashboard/search", authorization, search);

module.exports = router;
