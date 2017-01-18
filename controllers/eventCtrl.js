'use strict'
var Event 	   = require('../models/eventModel');

// Create endpoint /apirest/events for GET
var getEvents = function(req,res){
	Event.find(function(err, events){
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		} else{
			for(var i=0; i< events.length; i++){
				var temp = events[i].toObject();
				temp.id = temp._id;
    			delete temp._id;
				events[i] = temp;
			}
			return res.status(200).json({events:events});
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
			return res.status(409).json({message: "Event already exists"});
		} else{
			return res.status(201).location("http://localhost:8080/apirest/events/" + req.user._id).json({ event: newEvent.toClient()});				
		}
	});
}; 

// Create endpoint /apirest/events/:id for GET
var getEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if(!event){
			return res.status(404).json({message: "Not Found Event"});
		}
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		}else{
			return res.status(200).json({event: event.toClient()});		
		}
	});
}; 

// Create endpoint /apirest/events/:id for PATCH
var patchEvent = function(req, res) {
	Event.findById(req.params.event_id, function(err, event) {
		if(event.eventUserID != String(req.user._id)){
			return res.status(401).send({message: "You don't have permissions to update this workshop"})
		}
		if (err){
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!event){
			return res.status(404).json({message: "Not Found Event"});
		}

		Event.update({_id: req.params.event_id}, req.body, function(err) {
			if (err){
				return res.status(400).json({message: "Bad Requested"});
			}else{
				return res.status(200).location("http://localhost:8080/apirest/events/" + req.params.event_id).json({ event: event.toClient() });
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
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!event){
			return res.status(404).json({message: "Not Found Event"});
		}
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err){
				return res.status(400).json({message: "Bad Requested"});
			}else{
				return res.status(204).end();
			}
		});
	});
};

module.exports = {getEvents, postEvent, getEvent, patchEvent, deleteEvent}