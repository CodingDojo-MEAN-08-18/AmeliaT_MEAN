const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT||8000;

app.use(bodyParser.json()); 

// Use Angular
app.use(express.static( __dirname + '/public/dist/public' ));

// set up mongoose
mongoose.connect('mongodb://localhost:27017/restful_task_api', {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
// default for Promises
mongoose.Promise = global.Promise;

require('./server/models/task.js');
require('./server/config/routes.js')(app);

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));