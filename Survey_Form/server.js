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
app.use(express.static(path.join(__dirname, './static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'foolsgold',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

function css (request, response) {
    if (request.url.indexOf(".css") !== -1){
      var file = fs.readFileSync(`.${request.url}`, {'encoding' : 'utf8'});
      response.writeHead(200, {'Content-Type' : 'text/css'});
      response.write(file);
      response.end();
    }
  }

app.get('/', function(request, response) {
    response.render('index', {title: 'Survey Form'});
   
});

app.post('/results', function(request, response) {
    form_results = request.body;
    response.redirect('/counter');
});

// reset the counter
app.post('/result', function(request, response) {
    request.session.counter = 1;
    response.render('result', {survey_data: 'survey_data'});
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
});