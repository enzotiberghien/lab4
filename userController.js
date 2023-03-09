const bcrypt = require("bcrypt")
const db = require("./utils/database.js")
const jwt = require("jsonwebtoken")
const { setCurrentUser, setCurrentToken } = require("./middlewares/protect.js")

const loadView = (view) => {
  return (req, res, next) => {
    res.render(view)
    next()
  }
}

const login = async (req, res) => {
  const user = await db.getUser(req.body.userID)
  console.log("user: ", user)

  // Check if user exists
  if (user.length === 0) {
    console.log("User does not exsits!")
    return
  }

  // Check the that the password match with user password
  if (req.body.password === user[0].password) {
    setCurrentUser(req.body.userID)
    const token = jwt.sign(req.body.userID, process.env.ACCESS_TOKEN_SECRET)
    setCurrentToken(token)
    console.log(token)

    if (req.body.userID === "admin") res.redirect("/admin")
    else res.redirect("/")
  } else {
    req.method = "GET"
    res.redirect(`/fail/Incorrect Password`) // Redirect to the fail page
  }
}

module.exports = {
  login,
  loadView
}