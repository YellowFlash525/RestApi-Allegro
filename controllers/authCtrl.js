var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/userModel');


passport.use(new BasicStrategy(
  function(userLogin, userPassword, callback) {
    User.findOne({ userLogin: userLogin }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(userPassword, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });