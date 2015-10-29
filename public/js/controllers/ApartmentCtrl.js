angular.module('ApartmentCtrl', [])

	.controller('ApartmentController', function($scope, $http, $rootScope, Apartment) {
        $rootScope.isAdmin = true;
    	$rootScope.loading = true;
        $scope.formData = {};


        Apartment.get()
            .success(function(data) {
                $scope.apartments = data;
                $rootScope.loading = false;
            });


        $scope.createApartment = function() {
            $rootScope.loading = true;
            Apartment.create($scope.formData)
                .success(function(data) {
                    $scope.formData = {}; 
                    $scope.apartments = data; 
                    $rootScope.loading = false;
                });
        };

        // delete a apartment after checking it
        $scope.deleteApartment = function(id) {
            $rootScope.loading = true;
            Apartment.delete(id)
                .success(function(data) {
                    $scope.apartments = data;
                    $rootScope.loading = false;
                });
        };

});