angular.module('twApartments').factory('Apartment', ['$http', function($http) {

    return {
        // call to get all apartments
        get : function() {
            return $http.get('/api/apartments');
        },

         // call to get all apartments
        getApartmentById : function(id) {
            return $http.get('/api/apartment/' + id);
        },

        // call to POST and create a new apartment
        create : function(apartmentData) {
            return $http.post('/api/apartments', apartmentData);
        },

        // call to DELETE a apartment
        delete : function(id) {
            return $http.delete('/api/apartments/' + id);
        },

        update: function(apartmentData) {
            return $http.put('/api/apartments', apartmentData);
        }
    }

}]);