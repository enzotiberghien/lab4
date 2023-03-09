const jwt = require("jsonwebtoken")

let currentToken = ""
let currentUser = ""

const setCurrentToken = (value) => currentToken = value
const setCurrentUser = (value) => currentUser = value

const protect = (req, res, next) => {
  if (currentToken === "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET)) {
    console.log(currentUser)
    if (currentUser === "admin") {
      console.log("YYYES ADMIIIN")
      res.redirect("admin")
    }
    next()
  } else {
    res.redirect("identify")
  }
}

module.exports = {
  protect,
  setCurrentToken,
  setCurrentUser
}