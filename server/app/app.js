//external dependencies
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

//internal dependencies
const authRouter = require("../components/auth/authRoutes");
const userRouter = require("../components/user/userRouter");
const errorHandler = require("../components/error/globalErrorHandler");

//app declaration
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());

app.use(cookieParser());

const CLIENT_URI = path.join(__dirname, "..", "client", "dist");

//serving static files
app.use(express.static(path.join(CLIENT_URI)));

app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_URI, "index.html"));
});

//Routes middlewares
app.use("/api/v1/users", authRouter, userRouter);

//not found
app.all("*", (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "not found",
    url: req.originalUrl,
  });
});

app.use(errorHandler);

module.exports = app;
