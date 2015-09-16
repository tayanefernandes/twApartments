var MaintenanceRequest = require('./models/maintenanceRequest');

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

            getMaintenanceRequests(res);
        });

    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};
