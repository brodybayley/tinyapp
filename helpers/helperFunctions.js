const emailCheck = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return true;
    } else {
      return false;
    }
  }
};

const getUserID = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return database[registeredEmail].id;
    } else {
      return {};
    }
  }
};

const correctPassword = (database, password) => {
  for (const registeredEmail in database) {
    if (database[registeredEmail].password === password) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = { emailCheck, getUserID, correctPassword };