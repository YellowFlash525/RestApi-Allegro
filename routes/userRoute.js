var express    = require('express');        
var router = express.Router();

var User = require('../models/userModel');


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
		    res.json({ message: 'Please pass name and password.'});
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
module.exports = router;