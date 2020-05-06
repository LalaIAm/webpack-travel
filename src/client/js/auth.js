const submit = document.getElementById('new-password-btn');
const loginBtn = document.getElementById('login');
const email = document.getElementById('email-input')
const password = document.getElementById('password-input');
const logout = document.getElementById('logout-btn');

const logoutUser = () => {
    Travel.sendData('http://localhost:3000/logout', {});
}


const getNewPassword = () => {
    const newPassword = document.getElementById('new-password');
    const url = window.location.search;
    const params = new URLSearchParams(url);

    const token = params.get('token');
    const tokenId = params.get('tokenId');

    const resetData = {
        password: newPassword,
        token: token,
        tokenId: tokenId
    };

    return resetData;
}

const sendLoginData = async (email, password) => {
    const data = {
        email: email,
        password: password
    }

    try {
        let userId = await Travel.sendData('http://localhost:3000/login', data);
        console.log('id: ', userId)
    } catch (err) {
        console.log(err)
    }
}

const sendResetData = async () => {
    let data = getNewPassword();

    Travel.sendData('/http://localhost:3000/pswreset', data);
}
if (submit) {
    submit.onclick = () => {
        sendResetData();
    }
}
loginBtn.onclick = () => {
    const emailInput = email.value 
    const passwordInput = password.value
    sendLoginData(emailInput, passwordInput);
}

logout.onclick = () => {
    logoutUser()
}

export { getNewPassword, sendResetData, sendLoginData, logoutUser };