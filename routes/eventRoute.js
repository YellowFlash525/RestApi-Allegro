var express    		= require('express');        
var router 	   		= express.Router();
var Event 			= require('../models/eventModel');
var eventController = require('../controllers/eventCtrl');
var authController  = require('../controllers/authCtrl')

router.route('/events')
	.get(authController.isAuthenticated, eventController.getEvents)
	.post(authController.isAuthenticated, eventController.postEvent);

router.route('/events/:event_id')
	// get the bear with that id
	.get(authController.isAuthenticated, eventController.getEvent)
	// update the bear with this id
	.put(authController.isAuthenticated, eventController.putEvent)
	// delete the bear with this id
	.delete(authController.isAuthenticated, eventController.deleteEvent);

module.exports = router;