const express = require("express");
require("dotenv").config();

const authController = require("./authController");

const router = express.Router();

router.get(
  "/signin",
  authController.requireSignIn,
  authController.restrictToAdmin,
  authController.signin
);

module.exports = router;
