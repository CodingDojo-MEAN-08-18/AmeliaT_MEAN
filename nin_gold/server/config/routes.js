const goldController = require('../controllers/gold.js')
    //express = require('express'),
    //path = require('path'),
    //Gold = require('../models/gold.js');


module.exports = function(app) {
    app.get('/', goldController.index);
    app.post('/golds/', goldController.create);
    app.get('/golds/:id', goldController.show);
    app.put('/golds/:id', goldController.update);
    app.delete('/golds/:id', goldController.delete)
};