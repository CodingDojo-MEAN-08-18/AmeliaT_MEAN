const express = require('express');
app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');


// Setting Static and Views
app.use(express.static(path.join(__dirname, './static')));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//Set up session
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

const port = process.env.PORT||8000;

//set up flash
const flash = require('express-flash');
app.use(flash());

// Set up mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/basic_db',{useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected to Mongoose!'))
const {Schema} = mongoose;

//Set up login/registration
const UserSchema = new Schema({
    first_name:{
        type: String,
        required:[true,"First Name required to register"]
    },
    last_name: {
        type: String,
        required:[true,"Last Name required to register"]
    },
    email:{
        type: String,
        required:[true,"Must have a valid email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthday: {
        day:{type: Number,required:[true,"A birth day is required for registration"],min:1,max:31},
        month:{type: Number, required:[true,"A birth month is required for registration"],min:1,max:12},
        year:{type: Number, required:[true,"A birth year is required for registration"],min:1900,max:2018}
    },
    password:{
        type:String,
        required:[true,'A password is required'],
        minlength: 8,
    }
})
mongoose.model('User',UserSchema);
var User = mongoose.model('User');
const bcrypt = require('bcrypt');


app.get('/',function(request,response){
    response.render('index')
})

app.post('/register',function(request,response){
    new User({first_name:request.body.first_name,last_name:request.body.last_name,birthday:{day:request.body.day, month: request.body.month, year: request.body.year},email:request.body.email,password:request.body.password}).validate()
        .then((user)=>{
           bcrypt.hash(user.password,10)
                .then((hashed_pass)=>{
                    user.password = hashed_pass;
                })
                .catch((error)=>{
                    for(var key in error.errors){
                        request.flash('registration', error.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    response.redirect('/')
                })
            user.save()
                .then((user)=>{
                    response.redirect('/')
                })
                .catch((error)=>{
                    for(var key in error.errors){
                        request.flash('registration', error.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    response.redirect('/')
                })
        })
        .catch((error)=>{
            for(var key in error.errors){
                request.flash('registration', error.errors[key].message);
            }
            // redirect the user to an appropriate route
            response.redirect('/')
        })
})

app.post('/login',function(request,response){
    User({email:request.body.email,password:request.body.password}).validate()
        .then((user)=>{
            bcrypt.hash(request.body.password,10)
        .then((hashed_pass)=>{
            User.find({email:request.body.email,password: hashed_pass})
                .then((user)=>{
                    request.session = {first_name:user.first_name,last_name:user.last_name,email:user.email,birthday:user.birthday};
                    response.redirect('/dashboard')
                })
                .catch((error)=>{
                    for(var key in error.errors){
                        request.flash('login', error.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    response.redirect('/')
                })
        })
        .catch((error)=>{
            for(var key in error.errors){
                request.flash('login', error.errors[key].message);
            }
            // redirect the user to an appropriate route
            response.redirect('/')
        })
    })
})

// Setting server for port: 8000
app.listen(port, () => console.log(`listening on ${port} `));