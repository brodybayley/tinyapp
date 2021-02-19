const validEmail = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return true;
    }
  }
  return false;
};

const getUserByEmail = (database, email) => {
  for (const id in database) {
    if (email === database[id].email) {
      return database[id].id;
    }
  }
  return {};
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

module.exports = { getUserByEmail, validEmail, urlsForUser };