const express = require("express");
require("dotenv").config();

const authController = require("./authController");

const router = express.Router();

router.get("/", authController.signin);

module.exports = router;
