var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//GET - Return all registers
exports.findAll = function(req, res) {
	Category.find(function(err, categories) {
	if(err) res.send(500, err.message);
		console.log('GET /categories')
		res.status(200).jsonp(categories);
	});
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
	Category.findById(req.params.id, function(err, category) {
	if(err) return res.send(500, err.message);
		console.log('GET /categories/' + req.params.id);
		res.status(200).jsonp(category);
	});
};

//POST - Insert a new register
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var category = new Category({
		name: req.body.name,
		questions: req.body.questions
	});
	category.save(function(err, category) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(category);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	Category.findById(req.params.id, function(err, category) {
		category.name = req.body.name;
		category.questions = req.body.questions;
		category.save(function(err) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(category);
		});
	});
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	Category.findById(req.params.id, function(err, category) {
		category.remove(function(err) {
			if(err) return res.send(500, err.message);
			res.json({ message: 'Successfully deleted' });
		});
	});
};