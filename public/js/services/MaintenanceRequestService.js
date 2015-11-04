angular.module('twApartments').factory('MaintenanceRequest', ['$http', 'Apartment', function($http, Apartment) {

    return {
        getApartmentById: function(apartmentId) {
            return Apartment.getApartmentById(apartmentId);
        },

        getMaintenanceById: function(id) {
            return $http.get('/api/maintenancerequests/' + id);
        },

        get: function() {
            return $http.get('/api/maintenancerequests');
        },

        create: function(maintenanceData) {
            return $http.post('/api/maintenancerequests', maintenanceData);
        },

        delete: function(id) {
            return $http.delete('/api/maintenancerequests/' + id);
        },

        listWithApartment: function(apartmentId) {
            return $http.get('/api/maintenancerequestslist/');
        },

        addComment: function(commentData, maintenanceId) {
            return $http.put('/api/maintenancerequests/comments/' + maintenanceId, commentData);
        }
    }      

}]);