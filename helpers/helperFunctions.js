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

module.exports = { emailCheck, getUserID };