var express    	   = require('express');        
var router 	   	   = express.Router();
var User 	   	   = require('../models/userModel');
var userController = require('../controllers/userCtrl');
var authController = require('../controllers/authCtrl')


router.route('/users')
	.get(authController.isAuthenticated, userController.getUsers)
	.post(userController.postUser);

router.route('/users/:user_id')
	// get the bear with that id
	.get(authController.isAuthenticated, userController.getUser)
	// update the bear with this id
	.put(authController.isAuthenticated, userController.putUser)
	// delete the bear with this id
	.delete(authController.isAuthenticated, userController.deleteUser);

module.exports = router;