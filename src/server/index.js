const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { trips } = require('./db');
const {
  loginAnonymous,
  resetPassword,
  sendPasswordResetEmail,
  logoutCurrentUser,
  getCurrentUser,
  hasLoggedInUser,
  signUpUser,
  loginEmailPassword,
} = require('./auth');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.listen(PORT, () => {
  console.log(`sever listening at http://localhost:${PORT}`);
});

function callBack(req, res) {
  res.send('Post received');
}

app.post('/add', callBack);

const saveNewTrip = (req, res) => {
  const trip = req.body;
  const user = getCurrentUser();
  trip.owner_id = user.id;

  if (user) {
    trips
      .insertOne(trip)
      .then(() => console.log('New Trip Saved Successfully: ', trip))
      .catch((err) => console.log('error saving trip ', err));
  } else {
    loginAnonymous();
    trips
      .insertOne(trip)
      .then(() => console.log('New Trip Saved Successfully: ', trip))
      .catch((err) => console.log('error saving trip: ', err));
  }
};

const resetUserPassword = (req, res) => {
  const data = req.body;
  const password = data.password;
  const token = data.token;
  const tokenId = data.tokenId;

  const result = resetPassword(token, tokenId, password);
  res.send(result);
};

const sendResetEmail = (req, res) => {
  const email = req.body.email;

  sendPasswordResetEmail(email)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const anonLogin = (req, res) => {
  const user = loginAnonymous();
  if (user) {
    res.send('logged in');
  }
};

const loginUser = async (req, res) => {
  console.log(req.body, 'rew.');

  const data = req.body;

  let email = data.email;
  let pw = data.password;

  console.log('pw', pw);
  console.log('email: ', email);

  try {
    const result = await loginEmailPassword(email, pw);
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log('error logging in: ', error);
  }
};

const logoutUser = (req, res) => {
  logoutCurrentUser();
  res.send('User Logged Out');
};

app.post('/newtrip', saveNewTrip);
app.post('/pswreset', resetUserPassword);
app.post('/sendreset', sendResetEmail);
app.post('/anon', anonLogin);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
