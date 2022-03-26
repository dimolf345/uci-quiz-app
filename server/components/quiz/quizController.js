const { StatusCodes } = require("http-status-codes");

const Quiz = require("./quizModel");
const Question = require("../question/questionModel");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");
const {
  createCategoryFilter,
  checkQuestionNumber,
  checkQuizExistAndCreator,
} = require("./quizUtils");

exports.createQuiz = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const { questions, categories } = req.body;
  const categoryFilter = createCategoryFilter(categories);
  const selectedQuestions = await Question.find(categoryFilter)
    .limit(questions)
    .select("_id");
  const quiz = await Quiz.create({
    creatorId: userId,
    questions: selectedQuestions,
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    quiz,
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.params;
  const { answer, isSubmitted } = req.body;
  const quiz = await Quiz.findById(quizId);
  checkQuizExistAndCreator(quiz, res.locals.user, next);
  if (isSubmitted === true) {
    quiz.updateScore();
    const updatedQuiz = quiz.save();
    res.status(StatusCodes.OK).json({
      status: "success",
      updatedQuiz,
    });
  }
  if (quiz.isSubmitted && answers) {
    return next(
      new AppError(
        "Questo quiz è già stato chiuso! Resetta il quiz!",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});

exports.getQuestionFromQuiz = catchAsync(async (req, res, next) => {
  const { quizId, questionNumber } = req.params;
  const { user } = res.locals;
  const quiz = await Quiz.findById(quizId);
  checkQuizExistAndCreator(quiz, user, next);
  checkQuestionNumber(quiz, questionNumber, next);
  const questionId = quiz.questions[questionNumber - 1];
  const question = await Question.findById(questionId);
  if (!question)
    return next(
      new AppError(
        "La domanda cercata non è più nel DB, tentare un nuovo quiz",
        StatusCodes.NOT_FOUND
      )
    );
  res.status(StatusCodes.OK).json({
    status: "success",
    question,
  });
});
