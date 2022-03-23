const { StatusCodes } = require("http-status-codes");
const User = require("./userModel");

const catchAsync = require("../error/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  if (newUser) {
    res.status(StatusCodes.CREATED).json({
      newUser,
    });
  }
});
