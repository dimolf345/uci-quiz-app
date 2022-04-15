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
    answers: new Array(selectedQuestions.length).fill(""),
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    quiz,
  });
});

exports.updateQuizAnswer = catchAsync(async (req, res, next) => {
  const { quizId, questionNumber } = req.params;
  const { answer } = req.body;
  const quiz = await Quiz.findById(quizId);
  if (!quiz)
    return next(
      new AppError(
        `Il quiz con id ${quizId} non è presente nel DB`,
        StatusCodes.NOT_FOUND
      )
    );
  checkQuizExistAndCreator(quiz, res.locals.user, next);
  checkQuestionNumber(quiz, questionNumber, next);
  quiz.answers[questionNumber] = answer;
  await quiz.save();
  res.status(StatusCodes.OK).json({
    status: "success",
  });
});

exports.submitOrResetQuiz = catchAsync(async (req, res, next) => {
  const { isSubmitted } = req.body;
  const { quizId } = req.params;
  const quiz = await Quiz.findById(quizId);
  if (!quiz)
    return next(
      new AppError(
        `Il quiz con id ${quizId} non è presente nel DB`,
        StatusCodes.NOT_FOUND
      )
    );
  if (isSubmitted === "true" && quiz.isSubmitted === true)
    return next(
      new AppError(
        "Errore! Il quiz è stato già chiuso!",
        StatusCodes.BAD_REQUEST
      )
    );
  if (!isSubmitted) {
    await quiz.resetQuiz();
    return res.status(StatusCodes.OK).json({
      status: "success",
      quiz,
    });
  }
  const score = await quiz.updateScore();
  res.status(StatusCodes.OK).json({
    status: "success",
    score,
  });
});

exports.getQuestionFromQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const questionNumber = Number(req.params.questionNumber);
  const { user } = res.locals;
  const quiz = await Quiz.findById(quizId);
  if (!quiz)
    return next(
      new AppError(
        `Il quiz con id ${quizId} non è presente nel DB`,
        StatusCodes.NOT_FOUND
      )
    );
  checkQuizExistAndCreator(quiz, user, next);
  checkQuestionNumber(quiz, questionNumber, next);
  const questionId = quiz.questions[questionNumber];
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
    answer: quiz.answers[questionNumber],
  });
});

exports.getQuizStatus = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { user } = res.locals;
  const quiz = await Quiz.findById(quizId).populate("questions");
  if (!quiz)
    return next(
      new AppError(
        `Il quiz con id ${quizId} non è presente nel DB`,
        StatusCodes.NOT_FOUND
      )
    );
  checkQuizExistAndCreator(quiz, user, next);
  res.status(StatusCodes.OK).json({
    status: "success",
    quiz,
  });
});

exports.getAllQuizzes = catchAsync(async (req, res, next) => {
  const { user } = res.locals;
  if (user.email === "guest@marina.difesa.it")
    return next(
      new AppError(
        "Per vedere i risultati dei propri quiz occorre essere registrati"
      ),
      StatusCodes.FORBIDDEN
    );
  const quizzes = await Quiz.find({ creatorId: user.id });
  if (!quizzes)
    return next(
      new AppError(`Non ci sono quiz creati dall'utente ${user.name}`)
    );
  res.status(StatusCodes.OK).json({
    status: "success",
    quizzes,
  });
});
