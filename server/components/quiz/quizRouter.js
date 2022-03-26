const express = require("express");

const {
  createQuiz,
  getQuestionFromQuiz,
  updateQuiz,
} = require("./quizController");
const { requireSignIn, allowAsGuest } = require("../auth/authController");

const router = express.Router();

router.route("/").post(allowAsGuest, requireSignIn, createQuiz);

router.route("/:quizId").patch(allowAsGuest, requireSignIn, updateQuiz);

router
  .route("/:quizId/:questionNumber")
  .get(allowAsGuest, requireSignIn, getQuestionFromQuiz);

module.exports = router;
