const { AnonymousCredential } = require('mongodb-stitch-server-sdk');
const { stitch } = require('./db');

const loginAnonymous = () => {
  const credential = new AnonymousCredential();
  return stitch.auth.loginWithCredential(credential);
};

const hasLoggedInUser = () => {
  return stitch.auth.isLoggedIn;
};

const getCurrentUser = () => {
  return stitch.auth.isLoggedIn ? stitch.auth.user : null;
};

const logoutCurrentUser = () => {
  const user = getCurrentUser();
  return stitch.auth.logoutUserWithId(user.id);
};

module.exports = {
  loginAnonymous,
  hasLoggedInUser,
  getCurrentUser,
  logoutCurrentUser,
};
