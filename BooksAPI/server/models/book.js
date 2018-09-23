const mongoose = require('mongoose');
const validators = require ('mongoose-validators');
const {Schema} = mongoose;

//mongoose.connect('mongodb://localhost/books_api', {useNewUrlParser: true });

const bookSchema = new Schema({
  title: { type: String, required: [true, 'Books must have a title'], minlength: [2, '2 characters minimum']},
  year: { type: Number, required: [true, 'Book must have publication year'], max: [2018, 'Year cannot be in the future']}
});  

const authorSchema = new Schema({
  first_name: { type: String, required: [true, 'Must provide first name'], minLength: [2, '2 characters minimum']},
  last_name: { type: String, required: [true, 'Must provide last name'], minLength: [2, '2 characters minimum']}, 
  country: { type: String, required: [true, 'Must provide country of origin'], minLength: [3, '3 characters minimum']},
  birthday: { type: String, required: [true, 'Must provide author birthday'], },
//    birthday: { type: Date, required: [true, 'Must provide birthday'], validate: [validators.isBefore(Date())]},
  books: [bookSchema]
});

module.exports = {
  author: mongoose.model('Author', authorSchema),
  book: mongoose.model('Book', bookSchema)
};