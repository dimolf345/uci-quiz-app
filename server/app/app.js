//external dependencies
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
require("dotenv").config();

//app declaration
const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("porco dio");
}
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

module.exports = app;
