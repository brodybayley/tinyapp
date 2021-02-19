const { assert } = require('chai');

const { getUserByEmail, validEmail, urlsForUser } = require('../helpers/helperFunctions');

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

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "userRandomID" },
  i4BoGq: { longURL: "https://www.facebook.com", userID: "cJ49lG" },
  sgq3y6: { longURL: "https://www.today.com", userID: "cJ49lG" }
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

describe('validEmail', function() {
  it('should return true with valid email', function() {
    const user = validEmail(testUsers, "user@example.com");
    const expectedOutput = true;
    assert.equal(user, expectedOutput);
  });
  it('should return false if a user email is not in database', function() {
    const user = validEmail(testUsers, "user@fail.com");
    const expectedOutput = false;
    assert.equal(user, expectedOutput);
  });
  it('should return undefined if no email is provided', function() {
    const user = validEmail(testUsers, " ");
    const expectedOutput = false;
    assert.equal(user, expectedOutput);
  });
});

describe('urlsForUser', function() {
  it('should return url if associated with userID', function() {
    const url = urlsForUser(urlDatabase, "userRandomID");
    const expectedOutput = {
      b6UTxQ: { longURL: 'https://www.tsn.ca', userID: 'userRandomID' },
      i3BoGr: { longURL: 'https://www.google.ca', userID: 'userRandomID' }
    };
    assert(url, expectedOutput);
  });
  it('should not return url if not associated with userID', function() {
    const url = urlsForUser(urlDatabase, "userRandomID");
    const expectedOutput = {
      b6UTxQ: { longURL: 'https://www.tsn.ca', userID: 'userRandomID' },
      i3BoGr: { longURL: 'https://www.google.ca', userID: 'userRandomID' },
      i4BoGq: { longURL: "https://www.facebook.com", userID: "user2RandomID" },
    };
    assert.notEqual(url, expectedOutput);
  });
  it('should return an empty object if user has no urls', function() {
    const url = urlsForUser(urlDatabase, "user2RandomID");
    const expectedOutput = {};
    assert(url, expectedOutput);
  });
});