var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema ({
	userName: String;
	userSurname: String;
	userEmail: String;
});

module.exports = mongoose.model("User", userModel);