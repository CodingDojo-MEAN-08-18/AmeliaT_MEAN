const Task = require('mongoose').model('Gold');

module.exports = {
    index(req, res) {
        Task.find(req.body)
            .then(golds => res.json({golds: golds}))
            .catch(error => res.json(error));
    },
    create(req, res) {
        Task.create(req.body)
            .then(gold => res.json(gold))
            .catch(error => res.json(error));
    },
    show(req, res) {
        Task.findById(req.params.id)
            .then(gold => res.json(gold))
            .catch(error => res.json(error));
    },
    update(req, res) {
        Task.findByIdAndUpdate(req.params.id, req.body, {new:true})
            .then(gold => res.json(gold))
            .catch(error => res.json(error));
    },
    delete(req, res) {
        Task.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },
};