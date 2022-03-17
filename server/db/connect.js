/* eslint-disable no-console */
const mongoose = require("mongoose");
require("dotenv").config();

// const DB_URI =
//   process.argv[2] === "--local"
//     ? process.env.MONGO_LOCAL_URI
//     : process.env.MONGO_CLOUD_URI;

const DB_URI =
  "mongodb+srv://lucadimolfetta:Rusticone92@uci-quiz.4zf9n.mongodb.net/uci-quiz?retryWrites=true&w=majority";

const connectDB = async () => {
  console.log("Connecting to DB...");
  try {
    mongoose.connect(DB_URI, { autoIndex: true }, (err) => {
      if (err) throw new Error(err.message);
      console.log("Connection successful to the DB");
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
