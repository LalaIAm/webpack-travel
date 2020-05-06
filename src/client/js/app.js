const sendData = (url = '', data = {}) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const sentData = JSON.stringify(data);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: sentData,
        redirect: 'follow'
    };

    return fetch(url, options)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch(error => console.log('error posting: ', error));
}

export { sendData };