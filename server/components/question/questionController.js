const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const Question = require("./questionModel");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const questionBody = { creatorId: res.locals.user.id, ...req.body };
  const newQuestion = await Question.create(questionBody);
  if (newQuestion) {
    res.status(StatusCodes.CREATED).json({
      status: "success",
      question: newQuestion,
    });
  } else {
    return next(
      new AppError(
        "C'è stato un problema con la creazione della domanda",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});
