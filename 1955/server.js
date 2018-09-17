const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const app = express();

const port = process.env.PORT||8000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/1955_api', {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));

require('./server/config/database');
require('./server/config/routes')(app);

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));