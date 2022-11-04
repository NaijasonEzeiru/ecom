const router = require("express").Router();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const {
  registerUser,
  login,
  logout,
} = require("../../controllers/authController");

app.use(cookieParser());

router.post("/register", registerUser);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
