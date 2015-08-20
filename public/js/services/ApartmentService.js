angular.module('ApartmentService', []).factory('Apartment', ['$http', function($http) {

    return {
        // call to get all apartments
        get : function() {
            return $http.get('/api/apartments');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/apartments', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/apartments/' + id);
        }
    }       

}]);