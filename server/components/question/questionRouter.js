const express = require("express");

const router = express.Router();
const { requireSignIn, restrictToAdmin } = require("../auth/authController");
const {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("./questionController");

router.route("/").post(requireSignIn, restrictToAdmin, createQuestion);

router
  .route("/:questionId")
  .get(requireSignIn, getQuestion)
  .patch(requireSignIn, restrictToAdmin, updateQuestion)
  .delete(requireSignIn, restrictToAdmin, deleteQuestion);

module.exports = router;
