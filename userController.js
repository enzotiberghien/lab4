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
  if (req.body.password === user[0].password || await bcrypt.compare(req.body.password, user[0].password)) {
    setCurrentUser(req.body.userID)
    const token = jwt.sign(req.body.userID, process.env.ACCESS_TOKEN_SECRET)
    setCurrentToken(token)
    console.log(token)

    if (req.body.userID === "admin") res.redirect("/admin")
    else if (req.body.userID.includes("id")) res.redirect(`/users/${req.body.userID}`)
    else res.redirect("/")
  } else {
    req.method = "GET"
    res.redirect(`/fail/Incorrect Password`) // Redirect to the fail page
  }
}


const register = async (req, res) => {
  const userID = req.body.userID
  const name = req.body.name
  const role = req.body.role
  const encryptedPass = await encrypt(req.body.password)

  if(req.body.role === "admin") {
    req.method = "GET"
    console.log("Cannot register a new admin")
    res.redirect(`/register`);
    return
  }

  // Check if password and repeat password are not the same
  if (req.body.password !== req.body["repeat-password"]) {
    req.method = "GET"
    console.log("Password not matching")
    res.redirect(`/register`); // Redirect to the fail page
    return
  }

  // Check if user exists
  if ((await db.getUser(userID)).length > 0) {
    req.method = "GET"
    console.log("UserID already exists")
    res.redirect(`/register`); // Redirect to the fail page
    return
  }

  db.addUser(userID, name, role, encryptedPass)

  req.method = "GET"
  res.redirect("/identify")
}


const renderAdmin = async (req, res) => {
  res.render("admin.ejs", { users: await db.getUsers() })
}


const renderUser = async (req, res) => {
  let u = await db.getUser(req.params.userID)
  u = u[0]
  res.render("user.ejs", { user: u })
}


const encrypt = async (plainText) => {
  let encrypted
  try {
    encrypted = await bcrypt.hash(plainText, 10)
  } catch (error) {
    console.log("error: ", error)
  }
  return encrypted
}


module.exports = {
  login,
  register,
  loadView,
  renderAdmin,
  renderUser
}