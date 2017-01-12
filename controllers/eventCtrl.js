'use strict'
var Event 	   = require('../models/eventModel');

// Create endpoint /apirest/events for GET
var getEvents = function(req,res){
	Event.find(function(err, event){
		if(err){
			return res.status(400).end();
		} else{
			return res.status(200).json(event);
		}
	});
}; 

// Create endpoint /apirest/events for POST
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
			return res.status(409).end();
		} else{
			return res.status(201).location("/events/" + req.user._id).json({ message: 'Event created', event: newEvent});				
		}
	});
}; 

// Create endpoint /apirest/events/:id for GET
var getEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if(!event){
			return res.status(404).end();
		}
		if(err){
			return res.status(400).end();
		}else{
			return res.status(200).json(event);		
		}
	});
}; 

// Create endpoint /apirest/events/:id for PATCH
var updateEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if(event.eventUserID != String(req.user._id)){
			return res.status(401).send({message: "You don't have permissions to update this workshop"})
		}
		if (err){
			return res.status(400).end();
		}
		if(!event){
			return res.status(404).end();
		}

		Event.update({_id: req.params.event_id}, req.body, function(err) {
			if (err){
				return res.status(400).end();
			}else{
				return res.status(201).location("/events/" + req.params.event_id).json({ message: 'Event updated!', event: event });
			}
		});
	});
};

// Create endpoint /apirest/events/:id for DELETE
var deleteEvent = function(req, res) {
	Event.findById(req.params.event_id , function(err, event){
		if(event.eventUserID != String(req.user._id)){
			return res.status(401).send({message: "You don't have permissions to delete this workshop"})
		}
		if(err) {
			return res.status(400).end();
		}
		if(!event){
			return res.status(404).end();
		}
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err){
				return res.status(400).end();
			}else{
				return res.status(204).end();
			}
		});
	});
};

module.exports = {getEvents, postEvent, getEvent, updateEvent, deleteEvent}