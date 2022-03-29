const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

exports.generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.setTokenCookie = (response, token) => {
  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  response.cookie("jwt", token, cookieOptions);
};

exports.sendTokenAndUser = (response, user, token) => {
  response.status(StatusCodes.OK).json({
    status: "success",
    token,
    user,
  });
};

exports.findToken = (request) => {
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
