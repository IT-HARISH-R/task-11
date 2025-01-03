const express = require("express");
const logger = require("./utlis/logger");
const authRouter = require("./routers/authRout");
const errorPage = require("./utlis/errorPage");

const app = express();

app.use(express.json())

app.use(logger)

app.use("/auth", authRouter)


app.use(errorPage)
module.exports = app;