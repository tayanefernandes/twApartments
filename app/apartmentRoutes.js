// grab the nerd model we just created
var Apartment = require('./models/apartment');
var Maintenance = require('./models/maintenanceRequest');

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
        Maintenance.remove({
            _apartment: req.params.apartment_id
        }, function(err, maintenance) {
            Apartment.find({ _id : req.params.apartment_id }).remove().exec();
            getApartments(res);
        });
    });

    app.get('/api/apartment/:apartment_id', function(req, res) {
        Apartment.findOne({
            _id : req.params.apartment_id
        }, function(err, apartment) {
            if (err)
                res.send(err);

            res.json(apartment);
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
        }, function(err, apartments) {
            if (err)
                res.send(err);

            getApartments(res);
        });
    });

    app.put('/api/apartments', function(req, res) {
        Apartment.findByIdAndUpdate(req.body._id,
            {
                $set: {
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
                }
            },
            {
                safe: true,
                upsert: true
            },
           function(err, apartment) {
                if (err) {
                    res.send(err);
                }

                res.json(apartment);
            }
        );
    });
};

