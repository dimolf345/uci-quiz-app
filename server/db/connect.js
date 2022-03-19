/* eslint-disable no-console */
const mongoose = require("mongoose");

const connectDB = async (uri) => {
  console.log(`Connecting to DB...${uri}`);
  try {
    mongoose.connect(uri, { autoIndex: true }, (err) => {
      if (err) throw new Error(err.message);
      console.log("Connection successful to the DB");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
