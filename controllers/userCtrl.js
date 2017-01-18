'use strict'
var User 	   = require('../models/userModel');
var Event 	   = require('../models/eventModel');
var bcrypt       = require('bcryptjs');

// Create endpoint /apirest/users for GET
var getUsers = function(req,res){
	User.find(function(err,users){
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		}else{
			for(var i=0; i< users.length; i++){
				var temp = users[i].toObject();
				temp.id = temp._id;
    			delete temp._id;
				delete temp.userPassword;
				users[i] = temp;
			}
			return res.status(200).json({users: users});
		}
	});
};

// Create endpoint /apirest/users for POST
var postUser = function(req,res){
	if (!req.body.userLogin || !req.body.userPassword) {
		return res.status(401).end({message: "You must pass login/password"});
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
				return res.status(409).json({ message: 'User exists or your email is invalid.'});	
			} else {
				return res.status(201).location("http://localhost:8080/apirest/users/" + newUser._id).json({ user: newUser.toClient()});
			}
		});
	}
};

// Create endpoint /apirest/users/:id for GET
var getUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err){
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!user){
			return res.status(404).json({message: "Not Found User"});
		}
		return res.status(200).json({user: user.toClient()});
	});
};

// Create endpoint /apirest/users/:id for PATCH
var patchUser = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to update another user"});
	} 
	if(!req.body.userPassword){
		return res.status(401).json({ message: "You haven't entered a password."});
	}
	// retrieve the password field
	var password = req.body.userPassword;
	// update it with hash
	req.body.userPassword = bcrypt.hashSync(password);

	User.findByIdAndUpdate({ _id : req.params.user_id}, req.body, function(err, user) {
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!user){
			return res.status(404).json({message: "Not Found User"});
		}
		return res.status(200).location("http://localhost:8080/apirest/users/" + req.params.user_id).json({ user: user.toClient()});
	});
};

// Create endpoint /apirest/users/:id for DELETE
var deleteUser = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to delete another user"});
	} 
	User.findById(req.params.user_id, function(err, user){
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!user){
			return res.status(404).json({message: "Not Found User"});
		}
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err){
				return res.status(400).json({message: "Bad Requested"});
			} else {
				return res.status(204).end();
			}
		});	
	});
};

// Create endpoint /apirest/users/:id/events for GET
var getOwnedEvents = function(req, res) {
	if(req.params.user_id != req.user._id){
		return res.status(401).json({ message: "You don't have permissions to check events belong to another user"});
	} 
	Event.find({eventUserID: req.user._id}, function(err, events){
		if(err){
			return res.status(400).json({message: "Bad Requested"});
		}
		if(!events){
			return res.status(404).json({message: "Not Found Events"});
		}
		res.status(200).json(events);
	}).select('-eventUserID');
};

module.exports = {getUsers, postUser, getUser, patchUser, deleteUser, getOwnedEvents}


