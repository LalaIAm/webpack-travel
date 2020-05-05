const sendData = (data = {}) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const sentData = JSON.stringify(data);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: sentData,
        redirect: 'follow'
    };

    fetch('http://localhost:3000/new', options)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch(error => console.log('error posting: ', error));
}

export { sendData };