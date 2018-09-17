
const restful_controller = require('../controllers/restful');

module.exports = function(app) {
  app.get('/tasks', restful_controller.index);
  app.put('update/:id', restful_controller.update);
  app.post('/new/:id', crestful_controller.create);
  app.delete('/remove/:id', restful_controller.destroy);
  app.get('/:id', restful_controller.show);

};



 
