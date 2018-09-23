const bookController = require('../controllers/book');

module.exports = function(app) {
    app.get('/authors', bookController.index);
    app.post('/newauthor', bookController.createauthor);
    app.post('/newbook', bookController.createbook);
    app.put('/author/:id/update', bookController.update)
    app.delete('/removeauthor/:name', bookController.destroyauthor);
    app.delete('/removebook/:id/delete', bookController.destroybook);
    app.get('/author/:name', bookController.show);
};

