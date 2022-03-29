const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../user/userModel");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");
const {
  findToken,
  sendTokenAndUser,
  generateAccessToken,
  setTokenCookie,
} = require("./tokenHelpers");

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select(
    "+hashed_password +role"
  );
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "fail",
      message: "User not found",
    });
  }
  if (user.checkPassword(password)) {
    const token = generateAccessToken(user._id);
    user.last_access = Date.now();
    //if valideBeforeSave is not set to false model validation
    //will fail because of password missing
    await user.save({ validateBeforeSave: false });
    user.hashed_password = undefined;
    setTokenCookie(res, token);
    sendTokenAndUser(res, user, token);
  } else {
    const error = new AppError(
      "Autenticazione non riuscita!",
      StatusCodes.UNAUTHORIZED
    );
    next(error);
  }
});

exports.requireSignIn = catchAsync(async (req, res, next) => {
  //skips require sign in case allowAsGuest middleware has been called
  if (res.locals.user) return next();
  const token = res.locals.token ? res.locals.token : findToken(req);
  if (!token) {
    return next(
      new AppError(
        "Autenticazione fallita, riprovare il login",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  const id = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new AppError(err.message, 500));
    return decoded.id;
  });
  const currentUser = await User.findById(id).select("+role");
  res.locals.user = currentUser;
  next();
});

exports.restrictToAdmin = (req, res, next) => {
  const { role } = res.locals.user;
  if (role !== "admin") {
    return next(
      new AppError(
        "E' necessario un account di tipo admin per poter eseguire l'operazione!",
        StatusCodes.FORBIDDEN
      )
    );
  }
  next();
};

exports.allowAsGuest = catchAsync(async (req, res, next) => {
  const token = findToken(req);
  if (token) {
    res.locals.token = token;
    return next();
  }
  const guestUser = await User.findOne({
    email: "guest@marina.difesa.it",
  }).select("+role");
  if (!guestUser)
    return next(
      new AppError("L'utente ospite non è stato inserito nel database"),
      StatusCodes.UNAUTHORIZED
    );
  res.locals.user = guestUser;
  next();
});
