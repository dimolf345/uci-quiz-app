const express = require("express");

const router = express.Router();
const { requireSignIn, restrictToAdmin } = require("../auth/authController");
const { createQuestion, getQuestion } = require("./questionController");

router.route("/").post(requireSignIn, restrictToAdmin, createQuestion);

router.route("/:questionId").get(requireSignIn, getQuestion);

module.exports = router;
