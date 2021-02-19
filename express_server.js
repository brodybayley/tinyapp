const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { validEmail, getUserByEmail, urlsForUser } = require('./helpers/helperFunctions');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['asfasdg', 'asfsdge']
}));

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  i4BoGq: { longURL: "https://www.facebook.com", userID: "bJ48lK" },
  sgq3y6: { longURL: "https://www.today.com", userID: "cJ49lG" }
};

const users = {
  "aJ48lW": {
    id: "aJ48lW",
    email: "bobtheduck@quackmail.com",
    password: "$2b$10$T.WkgzlaOAJlUtKMk8Kl3OBL14J6Kl6vWJfDBJiziufaYfIoj2Luq"
  },
  "bJ48lK": {
    id: "bJ48lK",
    email: "jerrytheduck@quackmail.com",
    password: "$2b$10$T.WkgzlaOAJlUtKMk8Kl3OBL14J6Kl6vWJfDBJiziufaYfIoj2Luq"
  },
  "cJ49lG": {
    id: "cJ49lG",
    email: "brody@hola.com",
    password: "$2b$10$T.WkgzlaOAJlUtKMk8Kl3OBL14J6Kl6vWJfDBJiziufaYfIoj2Luq"
  }
};


app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.session["user_id"]]
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const isUser = validEmail(users, username);
  if (isUser) {
    const userID = getUserByEmail(users, username);
    if (bcrypt.compareSync(password, users[userID].password)) {
      req.session.userID = userID;
      res.redirect("/urls");
    } else {
      res.status(401).send('Wrong username or password');
    }
  } else {
    res.status(401).redirect('https://http.cat/403');
  }
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.session.userID]
  };
  res.render("register", templateVars);
});

app.post("/register", (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newID = generateRandomString();
  if (newEmail === '' || newPassword === '' || validEmail(users, newEmail)) {
    res.redirect('https://http.cat/400');
  } else {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const registerUser = {
      id: newID,
      email: newEmail,
      password: hashedPassword
    };
    users[newID] = registerUser;
    const userID = registerUser.id;
    req.session.userID = userID;
    res.redirect("/urls");
  }
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlsForUser(urlDatabase, req.session.userID),
    user: users[req.session.userID]
  };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.session.userID]
  };
  res.render("urls_new", templateVars);
});

//outputs a string with 6 random alphanumeric characters
const generateRandomString = () => Math.random().toString(36).substr(2, 6);

app.post("/urls", (req, res) => {
  const userID = req.session.userID;
  const longURL = req.body.longURL;
  const urlID = generateRandomString();
  const newURL = {
    longURL: longURL,
    userID: userID
  };
  urlDatabase[urlID] = newURL;
  res.redirect(`/urls/${urlID}`);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: users[req.session.userID]
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const urlID = req.params.shortURL;
  const longURL = urlDatabase[urlID].longURL;
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.redirect('https://http.cat/404');
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const user = req.session.userID;
  const shortURL = req.params.shortURL;
  if (user) {
    delete urlDatabase[shortURL];
  }
  res.redirect("/urls");
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const user = req.session.userID;
  const shortURL = req.params.shortURL;
  if (user) {
    urlDatabase[shortURL].longURL = req.body.longURL;
  }
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  const username = req.body.email;
  const userID = getUserByEmail(users, username);
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