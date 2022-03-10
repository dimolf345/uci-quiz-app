//external dependencies
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//internal dependencies
const userRouter = require("../routes/userRoutes");

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

//serving static files
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

//Routes middlewares
app.use("/api/v1/users", userRouter);

//not found
app.all("*", (req, res, next) => {
  res.redirect("/not-found");
});

module.exports = app;
