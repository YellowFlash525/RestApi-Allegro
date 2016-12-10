<<<<<<< HEAD
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userModel = new Schema({
    userLogin: String,
	userPassword: String,
	userName: String,
	userEmail: String,
});

module.exports = mongoose.model('User', userModel);
