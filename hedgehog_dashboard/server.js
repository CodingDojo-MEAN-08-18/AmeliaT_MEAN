const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const {Schema} = mongoose;
const app = express();
const port = process.env.PORT||8000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// DB set up (specify any local ports? mongoose.connect('mongodb://localhost:27017/quoting_dojo', {useNewUrlParser: true});

mongoose.connect('mongodb://localhost/hedgehog_dashboard');
const HedgehogSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    age: {type: Number, required: true },
    color: { type: String, required: true, min: 5, max: 255 },
    createdAt: { type: Date, timestamps: true }});
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));

mongoose.model('Hedgehogs', HedgehogSchema);
const Hedgehog = mongoose.model('Hedgehogs');

// set up Promises
mongoose.Promise = global.Promise;


// set up GET '/hedgehog' display  
app.get('/', function(req, res) {
    Hedgehog.find({}, function(err, hedgehog_list) {
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('index', { hedgehogs: hedgehog_list });
        }
    });
});

//GET information about one hedgehog
app.get('/hedgehogs/:id', function(req, res) {
    Hedgehog.find({ _id: req.params.id}, function(err, hedgehog_record) {
        if(err) {
            console.log(err);
            res.redirect('/' + req.params.id);
        } else {
            console.log("found hedgehog", req.params.id);
            console.log(hedgehog_record);
            res.render('profile', { hedgehogs: hedgehog_record});
        }
    });
});

//Make a new hedgehog
app.get('/new', function(req, res) {
    res.render('new');
})

// use  POST '/hedgehogs' to create a new hedghog & add to list after using the new hedgehog form,
app.post('/hedgehogs', function(req, res) {
    const new_hedgehog = new Hedgehog({ name: req.body.name, age: req.body.age, color: req.body.color, createdAt: req.body.createdAt });
    new_hedgehog.save(function(err){
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log("Here's a new hedgehog!");
            res.redirect('/');
        }
    });
});

// Edit an existing hedgehog from a form.
app.get('/edit/:id', function(req, res) {
    Hedgehog.findOne({ _id: req.params.id }).lean().exec(function(err, hedgehog_record) {
        if(err) {
            console.log(err);
            res.redirect('/' + req.params.id);
        } else {
            console.log("Here's the hedgehog with the id#", req.params.id);
            res.render('edit', { hedgehog: hedgehog_record });
        }
    });
});


// POST '/hedgehogs/:id' The action from the form when you update a hedgehog
app.post('/hedgehogs/:id', function(req, res) {
    Hedgehog.updateOne({ _id: req.params.id }, {name: req.body.name, age: req.body.age, color: req.body.color, createdAt: req.body.createdAt }, function(err, result) {
        if(err) {
            console.log(err);
            res.redirect('/' + req.params.id);
        } else { 
            console.log("Hedgehog updated");
            // See hedgehog details
            res.redirect('/');
        }
    });
});


// Should delete the hedgehog from DB.
app.post('/destroy/:id', function(req, res) {
    Hedgehog.deleteOne({ _id: req.params.id }, function(err, result) {
        if(err) {
            console.log(err);
            res.redirect('/' + req.params.id);
        } else { 
            console.log("Deleted hedgehog");
            res.redirect('/');
        }
    });
});


// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));
