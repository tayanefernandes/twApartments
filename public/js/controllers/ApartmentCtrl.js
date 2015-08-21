angular.module('ApartmentCtrl', [])

	.controller('ApartmentController', function($scope, $http, Apartment) {

    	$scope.tagline = 'Estou no controller do apartment';

    	$scope.formData = {};


        Apartment.get()
            .success(function(data) {
                $scope.apartments = data;
            });


        $scope.createApartment = function() {
            console.log('oiiiie');
            Apartment.create($scope.formData)
                .success(function(data) {
                    $scope.formData = {}; 
                    $scope.apartments = data; 
                });
        };

        // delete a todo after checking it
        $scope.deleteApartment = function(id) {
            Apartment.delete(id)
                .success(function(data) {
                    $scope.apartments = data;
                });
        };

});