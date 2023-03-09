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

const checkAccess = (requiredRole) => {
  return async (req, res, next) => {
    let user = await db.getUser(currentUser);
    user = user[0]
    if (!user || user.role !== requiredRole) {
      // res.status(401).send("Unauthorized.")
      return res.redirect('/identify');
    }
    next();
  }
}

module.exports = {
  protect,
  checkAccess,
  setCurrentToken,
  setCurrentUser
}