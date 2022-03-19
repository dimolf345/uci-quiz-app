/* eslint-disable no-console */
const app = require("./app/app");
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const DB_URI = process.argv.includes("--local")
  ? process.env.MONGO_LOCAL_URI
  : process.env.MONGO_CLOUD_URI;

//closes connection in case of unhandled rejection or uncaught exception
const shutdownServer = (connection) => {
  if (connection) {
    connection.close(() => {
      console.log("Shutting down server...");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

//connects to DB and then waits for HTTP requests
async function startServer(port) {
  try {
    await connectDB(DB_URI);
    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    return server;
  } catch (error) {
    console.log(error);
  }
}

const server = startServer(PORT);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  shutdownServer(server);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  shutdownServer(server);
});
