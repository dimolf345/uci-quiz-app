const express = require("express");

const {
  createQuiz,
  getQuestionFromQuiz,
  updateQuizAnswer,
  submitOrResetQuiz,
  getQuizStatus,
  getAllQuizzes,
} = require("./quizController");
const { requireSignIn, allowAsGuest } = require("../auth/authController");

const router = express.Router();

router
  .route("/")
  .get(requireSignIn, getAllQuizzes)
  .post(allowAsGuest, requireSignIn, createQuiz);

router
  .route("/:quizId")
  .get(allowAsGuest, requireSignIn, getQuizStatus)
  .patch(allowAsGuest, requireSignIn, submitOrResetQuiz);

router
  .route("/:quizId/:questionNumber")
  .get(allowAsGuest, requireSignIn, getQuestionFromQuiz)
  .patch(allowAsGuest, requireSignIn, updateQuizAnswer);

module.exports = router;
