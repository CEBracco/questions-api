var mongoose = require('mongoose');
var Category = mongoose.model('Category');

// POST - Add a new question to an existent Category
exports.add = function(req, res) {
	Category.findById(req.params.id, function(err, category) {
		var question;
		question.question=req.body.question;
		question.options=req.body.options;
		question.answer=req.body.answer;

		category.questions.push(question);
		category.save(function(err) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(category);
		});
	});
};