const mongoose = require('mongoose');
module.exports = {
    QuoteSchema: new mongoose.Schema({
        name:{
            type: String,
            required: [true, 'A name is required, otherwise select Skip To Quotes']
        },
        quote: {
            type: String,
            required: [true, 'A quote is required, otherwise select Skip To Quotes']
        }
    },{timestamps: true}),
}
var Quotes = mongoose.model('Quotes');