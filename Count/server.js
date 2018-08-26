// require express
var express = require("express");

var session = require("express-session");

var path = require("path");
// create the express app

var ejs = require("ejs");

var bodyParser = require('body-parser');

var app = express();

var port = 8000;

// static content
app.use(express.static(path.join(__dirname, "./static")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'foolsgold',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

app.get('/', function(request, response) {
     
   console.log("The request object", request);
    //start the count
    if (!request.session.counter){
        request.session.counter =1;
    }
    else {
        request.session.counter = request.session.counter +1;
    }
    response.render('index', {'counter': request.session.counter});
   
   console.log("The response object", response);
});

app.post('/counter2', function(request, response) {

    console.log("The request object", request);
    if (!request.session.counter) {
        request.session.counter = 2;
    }
    else {
        request.session.counter = request.session.counter + 2;
    }
    response.render('counter', {'counter': request.session.counter});
    console.log("The response object", response);
});

// reset the counter
app.post('/reset', function(request, response) {
    request.session.counter = 1;
    response.render('counter', {'counter': request.session.counter});
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
});