// grab the nerd model we just created
var Apartment = require('./models/apartment');

module.exports = function(app) {

    function getApartments(res){
        Apartment.find(function(err, apartments) {
            if (err)
                res.send(err)

            res.json(apartments);
        });
    };


    app.get('/api/apartments', function(req, res) {
        getApartments(res);
    });


    app.delete('/api/apartments/:apartment_id', function(req, res) {
        Apartment.remove({
            _id : req.params.apartment_id
        }, function(err, apartment) {
            if (err)
                res.send(err);

            getApartments(res);
        });
    });


    app.post('/api/apartments', function(req, res) {

        Apartment.create({
            name : req.body.name,
            address: req.body.address,
            energyInfo: req.body.energyInfo,
            internetInfo: req.body.internetInfo,
            rentAmount: req.body.rentAmount,
            condominium: req.body.condominium,
            mainBedrooms: req.body.mainBedrooms,
            contractStartDate: req.body.contractStartDate,
            allowedToReturnAfter: req.body.allowedToReturnAfter,
            observations: req.body.observations
        }, function(err, todo) {
            if (err)
                res.send(err);

            getApartments(res);
        });

    });
};
