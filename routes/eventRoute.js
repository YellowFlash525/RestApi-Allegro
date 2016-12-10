var express    = require('express');        
var router 	   = express.Router();

var Event = require('../models/eventModel');

router.route('/events')
	.get(function(req,res){
		Event.find(function(err, event){
			if(err){
				res.status(400);
				return res.send(err);
			} else{
				res.status(200);
				res.json(event);
			}
		});
	})
	.post(function(req,res){
		var newEvent = new Event({
			eventName: req.body.eventName,
			eventCategory: req.body.eventCategory,
			eventDate: req.body.eventDate,
			eventPlace: req.body.eventPlace,
			eventUsers: req.body.eventUsers
		});
		newEvent.save(function(err){
			if(err){
				res.status(409);
				return res.send(err);
			} else{
				res.status(201);
				return res.json({ message: 'Event created'});				
			}
		});
	});

router.route('/events/:event_id')
	// get the bear with that id
	.get(function(req, res) {
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
				res.send(err);
			res.json(event);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
				res.send(err);

			Event.name = req.body.name;
			Event.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Event updated!' });
			});

		});
	})
	// delete the bear with this id
	.delete(function(req, res) {
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err)
				res.send(err);

			res.json({ message: 'Event deleted' });
		});
	});

module.exports = router;