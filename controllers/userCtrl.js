'use strict'
var User 	   = require('../models/userModel');
var Event 	   = require('../models/eventModel');
var bcrypt       = require('bcryptjs');

// Create endpoint /apirest/users for GET
var getUsers = function(req,res){
	User.find(function(err,users){
		if(err){
			return res.status(400).json({message: 'Users not found'});
		}else{
			return res.status(200).json(users);
		}
	}).select('-userPassword');
};

// Create endpoint /apirest/users for POST
var postUser = function(req,res){
	if (!req.body.userLogin || !req.body.userPassword) {
		return res.status(401);
	} else {
		var newUser = new User({
		   userLogin: req.body.userLogin,
		   userPassword: req.body.userPassword,
		   userName: req.body.userName,
		   userEmail: req.body.userEmail
		});
		// save the user
		newUser.save(function(err) {
			if (err){
				return res.status(409).json({ message: 'User already exists.'});	
			} else {
				return res.location("/users/" + newUser._id).json({ message: 'Successful created new user.', user: newUser});
			}
		}).select('-userPassword');
	}
};

// Create endpoint /apirest/users/:id for GET
var getUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err){
			return res.status(400).end();
		}
		if(!user){
			return res.status(404).end();
		}
		return res.status(200).json({user: user.toClient()});
	}).select('-userPassword');
};

// Create endpoint /apirest/users/:id for PATCH
var updateUser = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to update another user"});
	} 
	// retrieve the password field
	var password = req.body.userPassword;
	// update it with hash
	req.body.userPassword = bcrypt.hashSync(password);

	User.findByIdAndUpdate({ _id : req.params.user_id}, req.body, function(err, user) {
		if(err){
			return res.status(400).end();
		}
		if(!user){
			return res.status(404).end();
		}
		return res.status(201).location("/users/" + req.params.user_id).json({ message: 'User updated!', user: user});
	}).select('-userPassword');
};

// Create endpoint /apirest/users/:id for DELETE
var deleteUser = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to delete another user"});
	} 
	User.findById(req.params.user_id, function(err, user){
		if(err){
			return res.status(400).end();
		}
		if(!user){
			return res.status(404).end();
		}
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err){
				return res.status(400).end();
			} else {
				return res.status(204).end();
			}
		});	
	});
};

// Create endpoint /apirest/users/:id/events for GET
var OwnedEvents = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to check events belong to another user"});
	} 
	Event.find({eventUserID: req.user._id}, function(err, events){
		if(err){
			return res.status(400).end();
		}
		if(!events){
			return res.status(404).end();
		}
		res.status(200).json(events);
	}).select('-eventUserID');
};

module.exports = {getUsers, postUser, getUser, updateUser, deleteUser, OwnedEvents}


