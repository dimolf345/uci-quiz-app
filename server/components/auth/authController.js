const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../user/userModel");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const setTokenCookie = (response, token) => {
  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  response.cookie("jwt", token, cookieOptions);
};

const sendTokenAndUser = (response, user, token) => {
  response.status(StatusCodes.OK).json({
    status: "success",
    token,
    user: {
      username: user.name,
      last_access: user.last_access,
      role: user.role,
    },
  });
};

const findToken = (request) => {
  let token;
  if (request.cookies.jwt) token = request.cookies.jwt;
  else if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  return token;
};

//signin searches user based on either username or email,
//compares the hashed_password in the DB with the hashed value of
//password sent, and then creates and sends the token as a cookie and
//as a response
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
    //valideBeforeSave is set to false because we only modify
    //last_access property and if set to true we have to
    //set the password property to validate
    await user.save({ validateBeforeSave: false });
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
  const token = findToken(req);
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
