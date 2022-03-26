const express = require("express");

const {
  createQuiz,
  getQuestionFromQuiz,
  updateQuizAnswer,
  submitOrResetQuiz,
} = require("./quizController");
const { requireSignIn, allowAsGuest } = require("../auth/authController");

const router = express.Router();

router.route("/").post(allowAsGuest, requireSignIn, createQuiz);

router.route("/:quizId").patch(allowAsGuest, requireSignIn, submitOrResetQuiz);

router
  .route("/:quizId/:questionNumber")
  .get(allowAsGuest, requireSignIn, getQuestionFromQuiz)
  .patch(allowAsGuest, requireSignIn, updateQuizAnswer);

module.exports = router;
