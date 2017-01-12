var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var eventModel   = new Schema({
    eventName: {
    	type: String,
    	required: true
    },
	eventCategory: {
    	type: String,
    	required: true
    },
	eventDate: {
    	type: String,
    	required: true
    },
	eventPlace: {
    	type: String,
    	required: true
    },
	eventUserID: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
},
{
    versionKey: false
});

eventModel.methods.toClient = function(){
	var event = this.toObject();
    //Rename fields
    event.id = event._id;
    delete event._id;
    return event;
}

module.exports = mongoose.model('Event', eventModel);
