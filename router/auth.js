require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");
const authorization = require("../middleware/authorization");

// Route for authentication

router.post("/auth/google", authorization, auth);

module.exports = router;