const express = require("express");

const { createQuiz } = require("./quizController");
const { requireSignIn, allowAsGuest } = require("../auth/authController");

const router = express.Router();

router.route("/").post(allowAsGuest, requireSignIn, createQuiz);

module.exports = router;
