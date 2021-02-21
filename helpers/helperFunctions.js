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
  return undefined;
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

//function to test that activeUser belongs to requested URL
const isUserURL = (database, activeUser, urlID) => {
  const urlUserID = database[urlID].userID;
  if (activeUser === urlUserID) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getUserByEmail, validEmail, urlsForUser, isUserURL };