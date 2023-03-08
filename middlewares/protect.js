const jwt = require("jsonwebtoken")

let currentKey = ""
let currentUser = ""

const protect = (req, res, next) => {
  if(currentKey === "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.eventNames.ACCESS_TOKEN_SECRET)) {
    next()
  } else {
    res.redirect("identify")
  }
}

module.exports = {
  protect
}