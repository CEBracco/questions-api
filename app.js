var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Connection to DB
mongoose.connect('mongodb://root:root@ds137110.mlab.com:37110/text-cast', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/category')(app, mongoose);
var CategoryCtrl = require('./controllers/categories');

var router = express.Router();

app.use(router);

// API routes
var api = express.Router();

 api.route('/categories') 
 .get(CategoryCtrl.findAll)
 .post(CategoryCtrl.add);

api.route('/categories/:id') 
 .get(CategoryCtrl.findById)
 .put(CategoryCtrl.update)
 .delete(CategoryCtrl.delete);

app.use('/api', api);


// Start server
app.listen(process.env.PORT || 3000, function() {
 console.log("Node server running");
});