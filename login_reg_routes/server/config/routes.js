var quotes = require('../controllers/quotes')
module.exports = function(app){
    app.get('/',function(req,res){
        quotes.index(req,res);
    })
    app.post('/quotes',function(req,res){
        quotes.post(req,res);
    });
    
    app.get('/quotes',function(req,res){
        quotes.get(req,res);
    });
}