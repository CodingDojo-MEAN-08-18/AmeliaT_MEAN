const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const path = require("path");
const app = express();

const port = process.env.PORT||8000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

// basic_mongoose DB set up
require('./server/config/mongoose');
require('./server/config/routes')(app);

//Alter server.js so that it finds static files within the dist folder of your Angular project
app.use(express.static( __dirname + '/public/dist/public' ));
//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/dist/public/index.html');
//  });

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));