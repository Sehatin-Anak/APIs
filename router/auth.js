require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");

// Route for authentication

router.get("/auth/google", auth);

// router.get("/auth/google/callback", auth.googleAuthCallback);

module.exports = router;
