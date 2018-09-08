const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://localhost:27017/animals', {
    useNewUrlParser:true
});

mongoose.connection.on('connected', () => console.log(`Mongoose connected`));

//const o = {
//    a: 'this is a',
//    b: 'this is b',
//};

//const {a,b} = o;
//console.log(a);

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    home_state: String,
    lucky_number: Number,
    birthday: {
        month: Number,
        day: Number,
        year: Number
    },
});
//(future collection) => animals
const Student = mongoose.model('Student', studentSchema);

//Different file
//const Animal = mongoose.model('Animal');

const student = new Student ({
    name: 'Amelia',
    home_state: 'WA', 
    lucky_number: 3, 
    birthday: {
        month: 04,
        day: 15,
        year: 1983
    }
});

console.log(student);

//animal.save(function(error, saved){
//    if (error){
        //handle error
//        throw error;
//    }
    //do stuff with saved animal
//    console.log(saved);
//});

student.save()
    .then(function(saved){
        console.log(saved);
    })
    .catch(function(error){
        console.log(error.errors.name.message);
        const keys = Object.keys(error.errors);
        const errors = [];
        for (let index = 0; index <keys.length; index++){
            console.log(index, keys[index]);
            const message = error.errors[keys[index]].message
            console.log(message)
            errors.push(message);
        }
            console.log(errors)
    });  