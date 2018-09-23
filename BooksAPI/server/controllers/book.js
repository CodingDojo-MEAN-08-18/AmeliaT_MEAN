const Book = require('mongoose').model('Book');
const Author = require('mongoose').model('Author');

module.exports = {
    index(req, res) {
        Author.find(req.body)
            .then(authors => res.json(authors))
            .catch(error => res.json(error));
    },
    createauthor(req, res) {
        Author.create(req.body)
            .then(author => { console.log(req.body);
                return res.json(author) })
            .catch(error => res.json(error));
    },
    createbook(req,res) {
        Book.create(req.body)
            .then(book => res.json(book))
            .catch(error => res.json(error));
    },
    show(req, res) {
        Author.findById(req.params.id)
            .then(author => res.json(author))
            .catch(error => res.json(error));
    },
    update(req, res) {
        Author.findByIdAndUpdate(req.params.id, req.body, {new:true})
            .then(author => res.json(author))
            .catch(error => res.json(error));
    },
    destroyauthor(req, res) {
        Author.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },
    destroybook(req, res) {
        Book.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },
};