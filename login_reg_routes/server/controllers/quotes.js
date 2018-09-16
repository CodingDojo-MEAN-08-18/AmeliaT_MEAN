const mongoose = require('mongoose'),
      Quotes = mongoose.model('Quotes');

module.exports = {
    index: function(req,res){
        res.render('index');
    },
    get: function(req,res){
        Quotes.find({},['name','quote','createdAt'],{sort:{createdAt:-1}})
            .then(function(quotes){
                console.log(quotes);
                res.render('quotes',{quotes})
            })
            .catch(function(error){
                console.log(err);
            })
    },
    post: function(req,res){
        var new_quote = new Quotes;
        new_quote.name = req.body.name;
        new_quote.quote = req.body.quote;
        new_quote.save()
                .then(function(saved){
                    res.redirect('/quotes')
                })
                .catch(function(error){
                    for(var key in error.errors){
                        req.flash('registration', error.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    res.redirect('/');
                })
    }

}