var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var eventModel   = new Schema({
    eventName: String,
	eventCategory: String,
	eventDate: String,
	eventPlace: String,
	eventUsers: Array,
},
{
    versionKey: false
});

module.exports = mongoose.model('Event', eventModel);
