var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var eventModel   = new Schema({
    eventName: String,
	eventCategory: String,
	eventDate: String,
	eventPlace: String,
	eventUserID: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
},
{
    versionKey: false
});

module.exports = mongoose.model('Event', eventModel);
