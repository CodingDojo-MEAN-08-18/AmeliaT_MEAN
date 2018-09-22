const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const app = express();

const port = process.env.PORT||8000;

app.use(bodyParser.json()); 

// basic_mongoose DB set up
mongoose.connect('mongodb://localhost/restful_task_api');
// default for Promises
mongoose.Promise = global.Promise;

//Alter server.js so that it finds static files within the dist folder of your Angular project
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/models/task.js');
require('./server/config/routes.js')(app);
require('./server/config/database.js');

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));