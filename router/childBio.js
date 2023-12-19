const express = require("express");
const authorization = require("../middleware/authorization");
const {
  create,
  update,
  getChild,
} = require("../controller/bioChildController");
const router = express.Router();

router.get("/user/:userId/bioChild", authorization, getChild);

router.post("/user/:userId/bioChild", authorization, create);

router.put("/user/:userId/bioChild", authorization, update);

module.exports = router;
