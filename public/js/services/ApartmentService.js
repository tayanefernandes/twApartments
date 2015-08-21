angular.module('ApartmentService', []).factory('Apartment', ['$http', function($http) {

    return {
        // call to get all apartments
        get : function() {
            return $http.get('/api/apartments');
        },

        // call to POST and create a new apartment
        create : function(apartmentData) {
            return $http.post('/api/apartments', apartmentData);
        },

        // call to DELETE a apartment
        delete : function(id) {
            return $http.delete('/api/apartments/' + id);
        }
    }      

}]);