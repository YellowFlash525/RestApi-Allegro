var User 	   = require('../models/userModel');

// Create endpoint /api/users for GET
var getUsers = function(req,res){
	User.find(function(err,users){
		if(err){
			res.status(400);
			return res.send(err);
		}else{
			res.status(200);
			res.json(users);
		}
	});
};

// Create endpoint /api/users for POST
var postUser = function(req,res){
	if (!req.body.userLogin || !req.body.userPassword) {
		res.status(401);
	} else {
		var newUser = new User({
		   userLogin: req.body.userLogin,
		   userPassword: req.body.userPassword,
		   userName: req.body.userName,
		   userEmail: req.body.userEmail
		});
		// save the user
		newUser.save(function(err) {
		if (err) {
		   res.status(409);
		   return res.json({ message: 'User already exists.'});
		}
		res.json({ message: 'Successful created new user.'});
		});
	}
};

// Create endpoint /api/users/:id for GET
var getUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err){
			console.log(err);
			return res.status(404).send({message: 'Couldn\'t find this User'})
		}
		if(!user){
			return res.status(404).send({message: 'No such user'})
		}
		res.status(200);
		res.json(user);
	});
};

// Create endpoint /api/users/:id for PUT
var putUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err){
			return res.status(404).send({message: 'Couldn\'t find this User'})
		}
		if(!user){
			return res.status(404).send({message: 'No such user'})
		}

		User.name = req.body.name;

		User.save(function(err) {
			if (err){
				res.status(400);
				res.send(err);
			}
			else {
				return res.status(201).send({ message: 'User updated!' });
			}
		});
	});
};

// Create endpoint /api/users/:id for DELETE
var deleteUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user){
		if(err){
			return res.status(404).send({ message: 'User not found'})
		}
		if(!user){
			return res.status(404).send({ message: 'No such user'})
		}
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err){
				return res.status(404).send({ message: 'Deleting user went wrong'})
			} else {
				return res.status(204).send({ message: 'User deleted' });
			}
		});	
	});
};

module.exports = {getUsers, postUser, getUser, putUser, deleteUser}


