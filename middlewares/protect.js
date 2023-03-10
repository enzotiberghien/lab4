const jwt = require("jsonwebtoken")
const db = require("../utils/database.js")


let currentToken = ""
let currentUser = ""

const setCurrentToken = (value) => currentToken = value
const setCurrentUser = (value) => currentUser = value

const protect = (req, res, next) => {
  if (currentToken === "") {
    res.redirect("identify")
  } else if (jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET)) {
    next()
  } else {
    // res.status(401).send("Unauthorized.")
    res.redirect("identify")
  }
}

const checkAccess = async (req, res, next) => {
  let user = await db.getUser(currentUser);
  user = user[0]

  if (user.role === "student") {
    if ((req.params.userID !== user.userID) && (user.role !== "teacher" || user.role !== "admin")) {
      // return 401 error
      return res.redirect('/identify');
    }
  } else if (user.role === "teacher") {
    if (req.path === "/admin" || req.params.userID === "admin") {
      // return 401 error
      return res.redirect('/identify');

    }
  }

  next();
}

module.exports = {
  protect,
  checkAccess,
  setCurrentToken,
  setCurrentUser
}