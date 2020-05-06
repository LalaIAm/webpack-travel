const { AnonymousCredential, UserPasswordCredential, UserPasswordAuthProviderClient } = require('mongodb-stitch-server-sdk');
const { stitch } = require('./db');

const authClient = stitch.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

const loginAnonymous = () => {
  const credential = new AnonymousCredential();
  return stitch.auth.loginWithCredential(credential);
};

const loginEmailPassword = (email, password) => {
  const credential = new UserPasswordCredential(email, password);
  stitch.auth.loginWithCredential(credential)
    .then(authedUser => console.log(`successfully logged in with id: `, authedUser.id))
    .catch(err => console.log('login failed: ', err));
}

const signUpUser = (email, password) => {
  authClient.registerWithEmail(email, password)
    .then(() => console.log(`User registered`))
    .then(() => loginEmailPassword(email, password))
    .catch(err => console.log('error creating new user: ', err));
}

const sendPasswordResetEmail = (email) => {
  authClient.sendResetPasswordEmail(email).then(() => {
    console.log('Successfully sent reset email')
    return 'success';
  }).catch(err => console.log('error sending reset email: ', err));
}

const resetPassword = (token, tokenId, password) => {
  authClient.resetPassword(token, tokenId, password)
    .then(() => console.log('Successful Reset!'))
    .catch(err => console.log('error reseting password', err));
}

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
  resetPassword,
  sendPasswordResetEmail,
  loginEmailPassword,
  signUpUser
};
