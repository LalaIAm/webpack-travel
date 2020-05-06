const {
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} = require('mongodb-stitch-server-sdk');
const { stitch, users } = require('./db');

const authClient = stitch.auth.getProviderClient(
  UserPasswordAuthProviderClient.factory
);

const userList = () => {
  return stitch.auth.listUsers()
}

const loginAnonymous = () => {
  const credential = new AnonymousCredential();
  return stitch.auth.loginWithCredential(credential);
};

const loginEmailPassword = async (email, password) => {
  const credential = new UserPasswordCredential(email, password);
  const userList = stitch.auth.listUsers()
  console.log('users: ', userList);
  try {
    const authedUser = await stitch.auth
      .loginWithCredential(credential);
    console.log(`successfully logged in with id: `, authedUser.id);
    return authedUser.id;
  }
  catch (err) {
    if (err.errorCode === 46) {
      signUpUser(email, password);
    }
    else {
      console.log('error signing in user: ', err);
    }
  }
};

const signUpUser = (email, password) => {
  authClient
    .registerWithEmail(email, password)
    .then(() => console.log(`User registered`))
    .then(() => loginEmailPassword(email, password))
    .catch((err) => console.log('error creating new user: ', err));
};

const sendPasswordResetEmail = (email) => {
  authClient
    .sendResetPasswordEmail(email)
    .then(() => {
      console.log('Successfully sent reset email');
      return 'success';
    })
    .catch((err) => console.log('error sending reset email: ', err));
};

const resetPassword = (token, tokenId, password) => {
  authClient
    .resetPassword(token, tokenId, password)
    .then(() => console.log('Successful Reset!'))
    .catch((err) => console.log('error reseting password', err));
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
  resetPassword,
  sendPasswordResetEmail,
  loginEmailPassword,
  signUpUser,
};
