const express = require("express");
const {
  register,
  verifyAcc,
  login,
  logout,
  userDetail,
} = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const route = express.Router();

route.post("/register", register);

route.post("/verify", verifyAcc);

route.post("/login", login);

route.post("/logout", logout);

route.get("/user/me", auth, userDetail);

module.exports = route;
