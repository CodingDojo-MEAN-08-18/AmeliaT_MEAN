const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ninja_gold', {useNewUrlParser: true });

const {Schema} = mongoose;


const goldSchema = new Schema({
  gold: {type: Number, required: false},
  name: {type: String, required: false, minLength: 5, maxLength:35}
}, {timestamps: true});

mongoose.model('Gold', goldSchema);

//var Gold = mongoose.model('Gold');
//mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Gold', goldSchema);