const express = require("express");

const usercontroller = require("../controllers/userController");

const router = express.Router();

router.post("/signup", usercontroller.createUser);

module.exports = router;
