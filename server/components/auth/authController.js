const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../user/userModel");
const catchAsync = require("../error/catchAsync");

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

exports.signin = catchAsync(async (req, res, next) => {
  const { search, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: search }, { email: search }],
  }).select("+hashed_password +role");
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "fail",
      message: "User not found",
    });
  }
  if (user.checkPassword(password)) {
    const token = generateAccessToken(user._id);
    user.last_access = Date.now();
    await user.save({ validateBeforeSave: false });
    setTokenCookie(res, token);
    res.status(StatusCodes.OK).json({
      status: "success",
      token,
      user: {
        username: user.username,
        last_access: user.last_access,
        role: user.role,
      },
    });
  } else {
    console.log("Calling next function...");
    next();
  }
});
