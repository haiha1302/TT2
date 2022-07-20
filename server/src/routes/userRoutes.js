const express = require("express");
const { UsersController } = require("../controllers/userController");
const { Auth } = require("../middleware/auth");

const route = express.Router();

route.post("/register", UsersController.register);

route.post("/verify", UsersController.verifyAcc);

route.post("/login", UsersController.login);

route.post("/logout", UsersController.logout);

route.get("/user/me", Auth.auth, UsersController.userDetail);

module.exports = route;
