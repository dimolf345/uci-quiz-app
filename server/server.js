/* eslint-disable no-console */
const app = require("./app/app");
const connectDB = require("./db/connect");

const port = process.env.PORT || 8000;
let server;

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
async function startServer() {
  try {
    const DB = await connectDB();
    if (DB === true) {
      server = app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    }
  } catch (error) {
    console.log(error);
    shutdownServer(server);
  }
}

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  shutdownServer(server);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  shutdownServer(server);
});

startServer();
