// const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    if (newUser) {
      res.status(StatusCodes.CREATED).json({
        newUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
