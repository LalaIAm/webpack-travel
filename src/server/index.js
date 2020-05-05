const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.listen(PORT, () => {
    console.log(`sever listening at http://localhost:${PORT}`)
})

function callBack(req, res) {
    res.send('Post received')
}

app.post('/add', callBack);