const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./utils/database")
require("dotenv").config()
const { protect } = require("./middlewares/protect")

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

app.get("/admin", (req, res) => {
  res.render("admin.ejs")
})

app.get("/identify", (req, res) => {
  res.render("identify.ejs")
})

app.listen(PORT, (err) => {
  console.log("Server running on port: ", PORT)
})