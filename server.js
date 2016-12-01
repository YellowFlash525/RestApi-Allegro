var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('events', ['events']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Wyświetlenie wydarzeń
app.get('/events', function (req, res) {
	console.log('I received a GET request');

	db.events.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

// Dadanie wydarzenia
app.post('/events', function (req, res) {
	console.log(req.body);

	db.events.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// Usunięcie wydarzenia
app.delete('/events/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	
	db.events.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// Wyświetlenie pojedyńczego wydarzenia
app.get('/events/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);

	db.events.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

// Modyfikacja pojedyńczego wydarzenia
app.put('/events/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	db.events.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: 
			{
				name: req.body.name,
				category: req.body.category,
				place: req.body.place,
				date: req.body.date
			}
		},
		new: true}, function (err, doc) {
			res.json(doc);
		}
	);
});

app.listen(3000);
console.log("server running on port 3000");