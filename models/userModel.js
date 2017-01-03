var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcryptjs');

var WORK_FLOW = 10;

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

// Execute before each user.save() call
userModel.pre('save', function (callback) {
    var user = this;
    if(!this.isModified('userPassword')){
        return callback();
    } else {
        // Password changed so we need to hash it
        bcrypt.genSalt(WORK_FLOW, function (err, salt) {
            if (err) {
                return callback(err);
            }
            bcrypt.hash(user.userPassword, salt, function (err, hash) {
                if (err) {
                    return callback(err);
                }
                user.userPassword = hash;
                callback();
            });
        });
    }
});

userModel.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.userPassword, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userModel);
