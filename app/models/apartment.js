// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApartmentSchema = new Schema({
    name : String, 
    address: String,
    energyInfo: String,
    internetInfo: String,
    rentAmount: Number,
    condominium: Number,
    mainBedrooms: Number,
    contractStartDate: Date,
    allowedToReturnAfter: Date,
    observations: String
    //maintenances : [{ type: Schema.Types.ObjectId, ref: 'Maintenance' }]
});


// define our apartment model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Apartment', ApartmentSchema);