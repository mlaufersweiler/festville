require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const {
  signupUser,
  loginUser,
  getUser,
  logoutUser,
  editUsername
} = require("./controllers/authController");

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database connected");
});
//auth endpoints
app.post("/auth/signup", signupUser);
app.post("/auth/login", loginUser);
app.get("/auth/user", getUser);
app.post("/auth/logout", logoutUser);
app.put("/auth/user/:username", editUsername);

app.listen(SERVER_PORT, () => {
  console.log(`server listening on port ${SERVER_PORT}`);
});
