const { assert } = require('chai');

const { getUserByEmail } = require('../helpers/helperFunctions');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail(testUsers, "user@example.com");
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });
  it('should return undefined if a user email is not in database', function() {
    const user = getUserByEmail(testUsers, "user@fail.com");
    const expectedOutput = undefined;
    assert.equal(user, expectedOutput);
  });
  it('should return undefined if no email is provided', function() {
    const user = getUserByEmail(testUsers, " ");
    const expectedOutput = undefined;
    assert.equal(user, expectedOutput);
  });
});