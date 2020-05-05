const modalBtn = document.getElementById('start-trip-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');

let currentTab = 0;
let inputData = {}

modalBtn.onclick = function () {
    modal.style.display = 'block';
};

closeBtn.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const showTab = (n) => {
    let x = document.getElementsByClassName('tab');
    x[n].style.display = 'block';

    if (n == 0) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline';
    }

    if (n == x.length - 1) {
        document.getElementById('nextBtn').innerHTML = 'submit';
    } else {
        document.getElementById('nextBtn').innerHTML = 'Next';
    }

    fixStepIndicator(n);
}

const submitAnswer = async (n) => {
    let x = document.getElementsByClassName('tab');
    let inputs = document.querySelectorAll('modal-input');

    let currentInput = inputs[currentTab];
    let inputKey = currentInput.getAttribute('data-key');
    let inputValue = currentInput.value 

    inputData[inputKey] = inputValue

    x[currentTab].style.display = 'none';

    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        modal.style.display = 'none';

        console.log('input: ', inputData);

        Travel.sendData(inputData);
        
        return inputData;
    }

}

const fixStepIndicator = (n) => {
    let i, x = document.getElementsByClassName('step');
    for (i = 0; i < x.length; i++){
        x[i].className = x[i].className.replace(' active', '');
    }

    x[n].className += 'active';
}

showTab(currentTab);

export {submitAnswer }