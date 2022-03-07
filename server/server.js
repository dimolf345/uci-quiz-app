const app = require("./app/app");
const connectToDB = require("./db/connect");

const port = process.env.PORT || 8000;

connectToDB(app, port);
