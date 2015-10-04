// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MaintenanceRequestSchema = new Schema({
	requesterName : {type: String, required: true}, 
    issueDescription: {type: String, required: true},
    isUrgent: {type: Boolean, required: true},
    comments: [{
    	 body: String,
    	 date: { type: Date, default: Date.now }
     }],
    _apartment : { type: Schema.Types.ObjectId, ref: 'Apartment' }

});

module.exports = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);