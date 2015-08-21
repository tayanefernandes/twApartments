// grab the nerd model we just created
var Apartment = require('./models/apartment');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

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

        // information comes from AJAX request from Angular
        Apartment.create({
            name : req.body.name,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            getApartments(res);
        });

    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};

