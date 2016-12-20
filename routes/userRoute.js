var express    = require('express');        
var router 	   = express.Router();
var User 	   = require('../models/userModel');


router.route('/users')
	.get(function(req,res){
		User.find(function(err,users){
			if(err){
				res.status(400);
				return res.send(err);
			}else{
				res.status(200);
				res.json(users);
			}
		});
	})
	.post(function(req,res){
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
		        return res.json({ message: 'Username already exists.'});
		      }
		      res.json({ message: 'Successful created new user.'});
		    });
		 }
	});

router.route('/users/:user_id')
	// get the bear with that id
	.get(function(req, res) {
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
	})

	// update the bear with this id
	.put(function(req, res) {
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
					res.status(201);
					res.json({ message: 'User updated!' });
				}
			});

		});
	})
	// delete the bear with this id
	.delete(function(req, res) {
		User.findById(req.params.user_id, function(err, user){
			if(err){
				return res.status(404).send({ message: 'User not found'})
			}
			if(!user){
				return res.status(404).send({message: 'No such user'})
			}
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err){
					return res.status(404).send({message: 'Deleting user went wrong'})
				}
				res.status(204);
				res.json({ message: 'User deleted' });
			});	
		});
	});
module.exports = router;