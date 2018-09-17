const Task = require('mongoose').model('Task');

module.exports = {
  index(request, response) {
    Task.find({})
      .then(tasks => response.json(tasks))
      .catch(error => response.json(error));
  },
  show(request, response) {
    Task.findOne(request.params)
      .then(task => {
      })
      .catch(error => response.json(error));
  },

  create(request, response) {
    Task.create(request.params)
      .then(new_task => response.json(new_task))
      .catch(error => response.json(error));
  },

  update(request, response){
    Task.updateOne(request.params)
      .then(update_task => response.json(update_task))
      .catch(error =>json(error));
  },

  destroy(request, response) {
    Task.remove(request.params)
      .then(result => response.json(result))
      .catch(error => response.json(error));
  },
};