const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./utils/database")
require("dotenv").config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.set("view-engine", "ejs");
app.engine("ejs", require("ejs").__express); // line needed to make ejs work
app.use(express.static("views"));


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/", (req, res) => {
  res.send("test")
})

app.listen(PORT, (err) => {
  console.log("Server running on port: ", PORT)
})