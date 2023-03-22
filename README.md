# lab4


--- npm install ----
--- To run server: npm run dev ---

This project focuses on user authentication and access control for a web application. The `server.js` file initializes the server and creates several routes, including `/`, `/admin`, and `/users/userID`. The `identify` and `register` routes contain both a `get` and `post` method that call the appropriate function from the `userController.js` file.

Within `userController.js`, there are functions for loading views, logging in, registering, and rendering user information. The `database.js` file has functions for interacting with the database and storing user data.

To ensure secure user access, two middlewares were implemented: `protect` and `checkAccess`. `Protect` verifies JWT tokens, while `checkAccess` ensures that a user can access the route they're attempting to access.

Overall, this project was a great learning experience in web development, user authentication, and access control.
