var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
    question: {type: String},
    options: [{type: String}],
    answer: {type: String},
})

var categorySchema = new Schema({
    name: {type: String},
    questions: [questionSchema]
})

module.exports = mongoose.model('Category', categorySchema);
