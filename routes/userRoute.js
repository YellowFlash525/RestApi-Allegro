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
	.patch(authController.isAuthenticated, userController.updateUser)
	// delete the bear with this id
	.delete(authController.isAuthenticated, userController.deleteUser);

router.route('/users/:user_id/events')
	.get(authController.isAuthenticated, userController.OwnedEvents)

module.exports = router;