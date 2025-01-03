const express = require("express");
const userController = require("../controller/userController");
const auth = require("../middlewares/authVerify");

const authRouter = express.Router();

authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);
authRouter.get("/user", auth.verifyUser, userController.me)

module.exports = authRouter;  