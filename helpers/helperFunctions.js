const emailCheck = (database, email) => {
  for (const registeredEmail in database) {
    if (email === database[registeredEmail].email) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = { emailCheck };