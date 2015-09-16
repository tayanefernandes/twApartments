angular.module('MaintenanceRequestService', []).factory('MaintenanceRequest', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/maintenancerequests');
        },

        create : function(maintenanceData) {
            return $http.post('/api/maintenancerequests', maintenanceData);
        },

        delete : function(id) {
            return $http.delete('/api/maintenancerequests/' + id);
        }
    }      

}]);