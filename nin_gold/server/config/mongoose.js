const mongoose = require('mongoose');
const fs = require('fs');
reg = new RegExp('\\.js$', 'i');
const path = require('path');
const modelsPath = path.resolve(__dirname, '../models');
mongoose.Promise  = global.Promise;

mongoose.connect('mongodb://localhost/ninja_gold', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Mongoose connected'));

fs.readdirSync(modelsPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelsPath, file));
    };
});

