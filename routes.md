GET / (redirects user to URLS page if logged in and login page if not logged in)

POST /login (will authenticate the form info)

GET /register (will bring user to registration)

POST /register (will check if user is registered and if not will register user)

POST /logout (will log users out)

GET /u/:shortURL (will allow user to use shortURL to access longURL site)

GET /urls/new (will allow user to create a new short URL by inputting longURL)

GET /urls/:shortURL (will provide user with clickable short URL, long URL and edit option)

