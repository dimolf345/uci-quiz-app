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
