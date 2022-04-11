const { StatusCodes } = require("http-status-codes");
const User = require("./userModel");

const catchAsync = require("../error/catchAsync");
const { checkIsAdmin } = require("./userUtils");

exports.createUser = catchAsync(async (req, res, next) => {
  const role = checkIsAdmin(req.body);
  console.log(role);
  const newUser = await User.create({ ...req.body, role });
  if (newUser) {
    res.status(StatusCodes.CREATED).json({
      status: "Successs",
      message: `L'utente ${newUser.name} è stato creato con successo!`,
    });
  }
});
