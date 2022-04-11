const { StatusCodes } = require("http-status-codes");
const AppError = require("../error/appError");

exports.createCategoryFilter = (arrayOfCategories) => {
  if (!arrayOfCategories || arrayOfCategories.length === 0) return {};
  const filter = [];
  arrayOfCategories.forEach((category) =>
    filter.push({
      category,
    })
  );
  return { $or: filter };
};

exports.checkQuizExistAndCreator = (quiz, user, next) => {
  const creator = quiz.creatorId.toString();
  if (!quiz)
    return next(
      new AppError("Il quiz richiesto non esiste!", StatusCodes.BAD_REQUEST)
    );
  if (creator !== user.id) {
    return next(
      new AppError("Non puoi accedere al quiz richiesto"),
      StatusCodes.FORBIDDEN
    );
  }
};

exports.checkQuestionNumber = (quiz, questionNum, next) => {
  const lastIndex = quiz.questions.length - 1;
  if (questionNum < 0 || questionNum > lastIndex)
    return next(
      new AppError("La domanda richiesta non esiste!", StatusCodes.BAD_REQUEST)
    );
};
