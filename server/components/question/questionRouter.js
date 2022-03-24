const express = require("express");

const router = express.Router();
const { requireSignIn, restrictToAdmin } = require("../auth/authController");
const { createQuestion } = require("./questionController");

router.route("/").post(requireSignIn, restrictToAdmin, createQuestion);

module.exports = router;
