require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");
const authorization = require('../middleware/authorization')

router.get("/auth/google", authorization, auth);

module.exports = router;
