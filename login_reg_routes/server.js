const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const {Schema} = mongoose;
const app = express();
const port = process.env.PORT||8000;

//true or false
app.use(bodyParser.urlencoded({extended: true}));

//set up static and views
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Allow for session 
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))  
//Allow for flash messages
const flash = require('express-flash');
app.use(flash());

// DB set up (specify any local ports? 
mongoose.connect('mongodb://localhost:27017/quoting_dojo', {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));

const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, min: 5, max: 255 }}, { timestamps: true });


QuoteSchema.virtual('date')
.get(function() {
    return this.createdAt.toDateString();
    });
QuoteSchema.virtual('hours')
    .get(function(){
        return this.createdAt.getHours();
    });
QuoteSchema.virtual('minutes')
    .get(function(){
        return this.createdAt.getMinutes();
    });

mongoose.model('Quotes', QuoteSchema);
const Quotes = mongoose.model('Quotes');

// set up Promises
mongoose.Promise = global.Promise;

require('./server/config/routes.js')(app);

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));

