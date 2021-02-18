const emailCheck = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return true;
    }
  }
  return false;
};

const getUserID = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return database[registeredEmail].id;
    }
  }
  return {};
};

const correctPassword = (database, password) => {
  for (const registeredEmail in database) {
    if (database[registeredEmail].password === password) {
      return true;
    }
  }
  return false;
};

const urlsForUser = (database, id) => {
  const filteredData = {};
  for (const url in database) {
    if (id === database[url].userID) {
      filteredData[url] = database[url];
    }
  }
  return filteredData;
};

module.exports = { emailCheck, getUserID, correctPassword, urlsForUser };