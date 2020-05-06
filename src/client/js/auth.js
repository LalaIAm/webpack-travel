const submit = document.getElementById('new-password-btn');

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

const sendResetData = async () => {
    let data = getNewPassword();

    Travel.sendData('/http://localhost:3000/pswreset', data);
}

submit.onclick = () => {
    sendResetData();
}

export { getNewPassword, sendResetData };