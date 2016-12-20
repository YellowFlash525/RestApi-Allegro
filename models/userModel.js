var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userModel = new Schema({
    userLogin: {
        type: String,
        unique: true
    },
	userPassword: {
        type: String
    },
	userName: String,
	userEmail: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model('User', userModel);
