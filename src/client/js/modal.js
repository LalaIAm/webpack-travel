const modalBtn = document.getElementById('start-trip-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');
const resetTab = document.getElementById('pwd-reset-tab');
const resetLink = document.getElementById('psw-forget');
const authTab = document.getElementById('auth-tab');
const btnBox = document.getElementById('btn-box');
const anonLogin = document.getElementById('login-anon');
const sendResetBtn = document.getElementById('send-reset');
const loginBtn = document.getElementById('login');

let currentTab = 0;
let inputData = {};

anonLogin.onclick = () => {
  Travel.sendData('/anon');
  submitAnswer(1);
};

modalBtn.onclick = function () {
  modal.style.display = 'block';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

resetLink.onclick = function () {
  authTab.style.display = 'none';
  btnBox.style.display = 'none';
  resetTab.style.display = 'block';
};

const sendResetEmail = () => {
  const email = document.getElementById('pwd-reset-email').value;

  const result = Travel.sendData('http://localhost:3000/sendreset', {
    email: email,
  });

  if (result === 'success') {
    const successTab = document.getElementById('success-tab');
    successTab.style.display = 'block';
  }
};

sendResetBtn.onclick = () => {
  sendResetEmail();
};

const showTab = (n) => {
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';

  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
    btnBox.style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
      btnBox.style.display = 'block';
    }
    

  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'submit';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }

  fixStepIndicator(n);
};

const submitAnswer = async (n) => {
  let x = document.getElementsByClassName('tab');
  let inputs = document.querySelectorAll('.modal-input');

  let currentInput = inputs[currentTab];
  let inputKey = currentInput.getAttribute('data-key');
  let inputValue = currentInput.value;

  inputData[inputKey] = inputValue;

  //if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = 'none';

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    modal.style.display = 'none';

    console.log('input: ', inputData);

    Travel.sendData('http://localhost:3000/newtrip', inputData);

    return inputData;
  }

  showTab(currentTab);
};

const fixStepIndicator = (n) => {
  let i,
    x = document.getElementsByClassName('step');

  x[n].setAttribute('class', 'step active');

  if (n - 1 >= 0) {
    i = n - 1;
    x[i].setAttribute('class', 'step');
  }
};

showTab(currentTab);

export { submitAnswer, sendResetEmail };
