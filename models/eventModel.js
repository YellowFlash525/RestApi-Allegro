var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventModel = new Schema ({
	eventName: String;
	eventCategory: String;
	eventDate: Date;
	eventPlace: String;
	eventUsers: Array;
});

module.exports = mongoose.model("Events", eventModel);