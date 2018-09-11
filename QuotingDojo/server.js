const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const {Schema} = mongoose;
//const cookieParser = require('cookie-parser');
//const flash = require('express-flash');
//const time = require('express-timestamp');
const app = express();
const port = process.env.PORT||8000;
//app.use(flash());


//true or false
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
//app.use(flash());

// DB set up (specify any local ports? mongoose.connect('mongodb://localhost:27017/quoting_dojo', {useNewUrlParser: true});

mongoose.connect('mongodb://localhost/quotes');
const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, min: 5, max: 255 }}, { timestamps: true });
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));

mongoose.model('Quotes', QuoteSchema);
const Quote = mongoose.model('Quotes');

// set up Promises
mongoose.Promise = global.Promise;

// set up GET ' / ' as the index
app.get('/', function(req, res) {
    res.render('index');
});

// set up GET '/quotes' in time-stamp & display  
app.get('/quotes', function(req, res) {
    Quote
    .find()
    .sort({ createdAt : -1 })
    .exec(function(err, quotes) {
        if(err) {
            console.log(err);
        } else {
            res.render('quotes', { quotes: quotes });
        }
    });
});

// use  POST '/quotes' to create a new quote & add to list
app.post('/quotes', function(req, res) {
    const quote = new Quote({ name: req.body.name, quote: req.body.quote});
    quote.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Added quote");
            res.redirect('/quotes');
        }
    });
});

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));

