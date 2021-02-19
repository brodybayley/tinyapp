# TinyApp Project

TinyApp is a full stack web application built with Node and Express which allows users to shorten their URLS similar to TinyURL.com. 

## Final Product

!["Screenshot of URL edit page"](https://github.com/brodybayley/tinyapp/blob/security/docs/urls-id.png?raw=true)

!["Screenshot of URLs page"](https://github.com/brodybayley/tinyapp/blob/security/docs/urls-page.png?raw=true)

!["Screenshot of login page"](https://github.com/brodybayley/tinyapp/blob/security/docs/urls-login.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
- Once the server shows `Example app listening on port 8080!` head to the browser and input `localhost:8080/login`.

## Using application
- Click on the `Register` link to register as a new user.
- User should be logged in and if the `Logout` button is pressed the user should be able to log back in using the `Login` button with the same credentials.
- If this is the first time logging in the URLs page will appear empty, so click the `Creat a New Short Link` or press the `Create New URL` link in the navigation bar.
- Follow the steps provided to create a customized short URL.
