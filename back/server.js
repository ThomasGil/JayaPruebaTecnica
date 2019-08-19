const express = require('express');
const cors = require('cors');

// create server
const app = express();
app.use(cors());

const port = 8088;

// Api endPoint
const api = require('./api/resources');
app.use('/api/wheater', api);

// Front end
app.use(express.static(__dirname + '/public'));

api.get(/.*/, (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(port);