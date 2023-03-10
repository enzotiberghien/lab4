const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lab4db', err => {
  if (err) console.log("Connection to database failed")
  console.log("Connected to the database...")
})

// const init = () => {
//   db.serialize(() => {
//     db.run("DROP TABLE users")
//     db.run('CREATE TABLE IF NOT EXISTS users(userID text PRIMARY KEY, name text, role text, password text)');
//     db.run(`INSERT INTO users VALUES 
//       ('id1', 'user1', 'student', 'password'),
//       ('id2', 'user2', 'student', 'password2'),
//       ('id3', 'user3', 'teacher', 'password3'),
//       ('admin', 'admin', 'admin', 'admin')`);
//     db.each("SELECT * FROM users", (err, row) => {
//       if (err) throw err

//       console.log(`${row.name} - ${row.password}`)
//     })
//   })
// }
// init()

const addUser = (userID, name, role, password) => {
  db.run("INSERT INTO users VALUES (?, ?, ?, ?)", [userID, name, role, password], (err) => {
    if (err) throw err
  })

  console.log(userID, name, role, password)
}

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    const users = []
    db.each("SELECT * FROM users", (err, row) => {
      users.push({ userID: row.userID, name: row.name, role: row.role,  password: row.password })
    }, (err) => err ? reject(err) : resolve(users))
  })
}

const getUser = async (user) => {
  const users = await getUsers()
  console.log(users)
  const filtered = users.filter(e => e.userID === user)
  console.log(filtered)
  return filtered
}

module.exports = {
  addUser,
  getUsers,
  getUser
}