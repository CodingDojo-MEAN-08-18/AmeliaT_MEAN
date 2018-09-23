const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const modelsPath = path.resolve('server', 'models');
mongoose.Promise  = global.Promise;

mongoose.connect('mongodb://localhost/books_api', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Mongoose connected'));

fs.readdirSync(modelsPath).forEach(file => {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath+'/'+file);
    };
});