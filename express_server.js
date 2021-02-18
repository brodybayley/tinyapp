const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { emailCheck, getUserID, correctPassword } = require('./helpers/helperFunctions');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "bobtheduck@quackmail.com",
    password: "quazy"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "jerrytheduck@quackmail.com",
    password: "quackers"
  }
};

app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]]
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  if (emailCheck(users, newEmail) && correctPassword(users, newPassword)) {
    const userID = getUserID(users, newEmail);
    res.cookie("user_id", userID);
    res.redirect("/urls");
  } else {
    res.redirect('https://http.cat/403');
  }
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]]
  };
  res.render("register", templateVars);
});

app.post("/register", (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newID = generateRandomString();
  if (newEmail === '' || newPassword === '' || emailCheck(users, newEmail)) {
    res.redirect('https://http.cat/400');
  } else {
    const registerUser = {
      id: newID,
      email: newEmail,
      password: newPassword
    };
    users[newID] = registerUser;
    res.cookie("user_id", newID);
    res.redirect("/urls");
  }
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["user_id"]]
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["user_id"]]
  };
  res.render("urls_new", templateVars);
});

//outputs a string with 6 random alphanumeric characters
const generateRandomString = () => Math.random().toString(36).substr(2, 6);

app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies["user_id"]]
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.redirect('https://http.cat/404');
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  const username = req.body.email;
  const userID = getUserID(users, username);
  res.clearCookie("user_id", userID);
  res.redirect("/login");
});

// app.get("/", (req, res) => {
//   res.send("Hello!");
// });

// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });

// app.get("/hello", (req, res) => {
//   res.send("<html><body>Hello <b>World</b></body></html>\n");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});