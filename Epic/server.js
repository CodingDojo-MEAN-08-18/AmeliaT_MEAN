// require express
var express = require("express");

var path = require("path");
// create the express app

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/static'));
// static content
//app.use(express.static(path.join(__dirname, './static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

// tell the express app to listen on port 8000, always put this at the end of your server.js file
var server = app.listen (8000, function() {
  console.log("listening on port 8000");
});

var counter = 0;

app.get('/', function(req, res) {
    res.render('index')
});

const io = require('socket.io').listen(server);

io.on('connection', function (socket) { 
    console.log('socket connection available');

    socket.on('counter', function (data) { 
        counter++;
        socket.emit('server_response', {counter: counter });
    });

    socket.on('reset_count', function(data) {
        counter = 0;
        socket.emit('server_response', {counter: counter });
    })
});

//var route = require('./routes/index.js')(app, server);