const express = require("express");

const usercontroller = require("./userController");

const router = express.Router();

router.post("/signup", usercontroller.createUser);

module.exports = router;
