const express = require("express");
require("dotenv").config();

const authController = require("./authController");

const router = express.Router();

router.post("/login", authController.signin);

module.exports = router;
