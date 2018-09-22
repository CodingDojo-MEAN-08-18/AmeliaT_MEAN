const mongoose = require('mongoose');
const apiController = require('./../controllers/restful.js')

module.exports = function(app){

	//retrieves all new tasks
	app.get('/tasks', apiController.index),

	//Adds name to database
	app.post('/new', apiController.add),

	//Removes name from database
	app.delete('/remove/:id', apiController.remove),

	//Retrieve a Task by ID
	app.get('/task/:id', apiController.show),

	app.put('/update/:id', apiController.update)

};