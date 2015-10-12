var MaintenanceRequest = require('./models/maintenanceRequest');
var sendgrid = require("sendgrid")(process.env.SENDGRID_KEY);

module.exports = function(app) {

    function getMaintenanceRequests(res) {
        MaintenanceRequest.find(function(err, maintenanceRequests) {
            if (err) {
                res.send(err);
            }

            res.json(maintenanceRequests);
        });
    };

    app.get('/api/maintenancerequests', function(req, res) {
        getMaintenanceRequests(res);
    });

    app.delete('/api/maintenancerequests/:maintenance_id', function(req, res) {
        MaintenanceRequest.remove({
            _id : req.params.maintenance_id
        }, function(err, maintenance) {
            if (err) {
                res.send(err);
            }

            getMaintenanceRequests(res);
        });
    });

    app.post('/api/maintenancerequests', function(req, res) {
        MaintenanceRequest.create({
            requesterName : req.body.requesterName, 
            issueDescription: req.body.issueDescription,
            isUrgent: req.body.isUrgent,
            _apartment : req.body.apartmentId

        }, function(err, todo) {
            if (err){
                res.send(err);
            }
            sendEmail(req.body.apartmentRelated, req.body.requesterName, req.body.issueDescription, verifyUrgency(req.body.isUrgent));
            getMaintenanceRequests(res);
        });

    });

    var verifyUrgency = function(isUrgent) {
        return isUrgent? '[URGENT]':'';
    }

    var sendEmail = function(apartment, name, description, isUrgent) {
        var email = new sendgrid.Email();
        email.addTo('tfernand@thoughtworks.com');
        email.setFrom('twapartments@gmail.com');
        
        email.setSubject(isUrgent + ' Maintenance Request - Apartment ' + apartment.name);
        email.setHtml('<p> Requester: '+ name +'</p> <p> Message: '+ description + '</p>');
         
        sendgrid.send(email);
    };

    app.get('/api/maintenancerequestslist', function(req, res) {
        MaintenanceRequest.find()
        .populate('_apartment')
        .exec(function(err, maintenancerequests){
            if (err){
                res.send(err);
            }

            res.json(maintenancerequests);
         })
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};
