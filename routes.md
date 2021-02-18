POST /login (will authenticate the form info)

GET /register (will bring user to registration)

POST /register (will check if user is registered and if not will register user)

POST /logout (will log users out)

GET /u/:shortURL (will allow user to use shortURL to access longURL site)

app.get("/u/:shortURL", (req, res) => {
  const urlID = req.params.shortURL
  const longURL = urlDatabase[urlID].longURL;
  console.log(urlID)
  console.log(urlDatabase)
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.redirect('https://http.cat/404');
  }
});