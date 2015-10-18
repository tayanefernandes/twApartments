angular.module('MaintenanceRequestService', []).factory('MaintenanceRequest', ['$http', 'Apartment', function($http, Apartment) {

    return {
        getApartmentById : function(apartmentId) {
            return Apartment.getApartmentById(apartmentId);
        },

        get : function() {
            return $http.get('/api/maintenancerequests');
        },

        create : function(maintenanceData) {
            return $http.post('/api/maintenancerequests', maintenanceData);
        },

        delete : function(id) {
            return $http.delete('/api/maintenancerequests/' + id);
        },

        listWithApartment : function(apartmentId) {
            return $http.get('/api/maintenancerequestslist/');
        }
    }      

}]);