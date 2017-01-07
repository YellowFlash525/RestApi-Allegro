var Event 	   = require('../models/eventModel');

// Create endpoint /api/events for GET
var getEvents = function(req,res){
	Event.find(function(err, event){
		if(err){
			res.status(400);
			return res.send(err);
		} else{
			res.status(200);
			res.json(event);
		}
	});
}; 

// Create endpoint /api/events for POST
var postEvent = function(req,res){
	var newEvent = new Event({
		eventName: req.body.eventName,
		eventCategory: req.body.eventCategory,
		eventDate: req.body.eventDate,
		eventPlace: req.body.eventPlace,
		eventUserID: req.user._id
	});
	newEvent.save(function(err){
		if(err){
			res.status(409);
			return res.send(err);
		} else{
			res.status(201);
			return res.send({ message: 'Event created'});				
		}
	});
}; 

// Create endpoint /api/events/:id for GET
var getEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if(!event){
			res.status(404);
			return res.send({message: 'No such event'});
		}
		if(err){
			console.log(err);
			return res.status(404).send({message: 'Couldn\'t find this Event'});
		}else{
			res.status(200);
			res.json(event);				
		}
	});
}; 

// Create endpoint /api/events/:id for PUT
var putEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if (err){
			console.log(err);
			return res.status(404).send({message: 'Couldn\'t find this Event'})
		}
		if(!event){
			return res.status(404).send({message: 'No such event'})
		}

		Event.eventName = req.body.eventName;
		Event.save(function(err) {
			if (err){
				res.status(400);
				return res.send(err);
			}else{
				return res.status(200).send({ message: 'Event updated!' });
			}
		});
	});
};

// Create endpoint /api/events/:id for DELETE
var deleteEvent = function(req, res) {
	Event.findById(req.params.event_id , function(err, event){
		if(err) {
			console.log(err);
			return res.status(404).send({ message: 'Event not found'})
		}
		if(!event){
			return res.status(404).send({ message: 'Event not found'});
		}
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err){
				res.status(404);
				return res.send(err);
			}else{
				return res.status(200).send({ message: 'Event deleted' });
			}
		});
	});
};

module.exports = {getEvents, postEvent, getEvent, putEvent, deleteEvent}