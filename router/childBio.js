const express = require("express");
const authorization = require("../middleware/authorization");
const { create, update, getChild } = require("../controller/bioChildController");
const router = express.Router();

router.get('/bioChild', authorization, getChild)

router.post("/bioChild/create", authorization, create);

router.put('/bioChild/update/:id', authorization, update)

module.exports = router;
