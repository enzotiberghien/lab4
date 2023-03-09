const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./utils/database")
require("dotenv").config()
const { protect, checkAccess } = require("./middlewares/protect")
const { loadView, login } = require("./userController.js")

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.set("view-engine", "ejs");
app.engine("ejs", require("ejs").__express); // line needed to make ejs work
app.use(express.static("views"));


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/", protect, (req, res) => {
  res.render("start.ejs")
})
app.post("/", protect, (req, res) => {
  res.render("start.ejs")
})

app.get("/admin", protect, checkAccess("admin"), loadView("admin.ejs"))

app.route("/identify")
  .get(loadView("identify.ejs"))
  .post(login)


app.listen(PORT, (err) => {
  console.log("Server running on port: ", PORT)
})