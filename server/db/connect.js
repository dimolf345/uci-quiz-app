/* eslint-disable no-console */
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.argv.includes("--local")
  ? process.env.MONGO_LOCAL_URI
  : process.env.MONGO_CLOUD_URI;

const connectDB = async () => {
  console.log(`Connecting to DB...${DB_URI}`);
  try {
    mongoose.connect(DB_URI, { autoIndex: true }, (err) => {
      if (err) throw new Error(err.message);
      console.log("Connection successful to the DB");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
