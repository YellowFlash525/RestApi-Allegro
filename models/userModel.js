var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcryptjs');

var SALT_WORK_FACTOR = 10;

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
},
{
    versionKey: false
});

userModel.pre('save', function(next){
    var user = this;
    if (!user.isModified('userPassword')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.userPassword, salt, function(err, hash){
            if(err) return next(err);
 
            user.userPassword = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userModel);
