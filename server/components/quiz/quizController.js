const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const Quiz = require("./quizModel");
const Question = require("../question/questionModel");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");

exports.createQuiz = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const { questions, categories } = req.body;
  const selQuestions = await Question.find().limit(questions).select("_id");
  const newQuiz = await Quiz.create({
    creatorId: userId,
    questions: selQuestions,
  });
  return res.status(StatusCodes.OK).json({
    status: "success",
  });
});
