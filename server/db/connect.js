const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI =
  process.argv[2] === "--local"
    ? process.env.MONGO_LOCAL_URI
    : process.env.MONGO_CLOUD_URI;

const connect = async (app, port) => {
  try {
    mongoose.connect(DB_URI, { autoIndex: true });
    mongoose.connection.on("connected", () => {
      console.log("Connection successful to the DB");
    });
    app.listen(port, () => {
      console.info(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
