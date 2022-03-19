const { StatusCodes } = require("http-status-codes");
const AppError = require("./appError");
require("dotenv").config();

//in development mode we send all the information regarding the error in order to find the bug
const sendErrorDev = (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    error: err,
    stack: err.stack,
  });

const sendErrorProd = (err, req, res) => {
  //if err.isOperational, we have valid methods to handle the error, so we
  //send detailed information to the client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //otherwise it's a non expected error, so we give only generic information
  console.log("ERROR, 🔥", err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "Error",
    message: "Something went very wrong",
  });
};

//custom error handlers for DB errors or JWT error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicateFieldDB = (err) => {
  const field = Object.keys(err.keyValue);
  const message = `Errore! Il campo ${field}, contenente il valore ${err.keyValue[field]}, dev'essere unico!`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationErrorDB = (err) => {
  let message = "La validazione dei dati inseriti non è riuscita:\n- ";
  let valErrors = Object.values(err.errors).map((field) => field.message);
  valErrors = valErrors.join("\n- ");
  message += valErrors;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    //since we want to motify the err variable and it is NOT a good practice to modify directly
    //incoming variables, we create a copy of the err object
    let copyErr = { ...err };
    //custom error handlers
    if (copyErr.name === "CastError") copyErr = handleCastErrorDB(copyErr);
    if (copyErr.code === 11000) copyErr = handleDuplicateFieldDB(copyErr);
    if (copyErr.name === "ValidationError")
      copyErr = handleValidationErrorDB(copyErr);
    sendErrorProd(copyErr, req, res);
  }
  next();
};

module.exports = globalErrorHandler;
