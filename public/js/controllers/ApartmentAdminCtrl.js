angular.module('twApartments').controller('ApartmentAdminController', function($scope, $http, $rootScope, Apartment) {
    $rootScope.isAdmin = true;
	$rootScope.loading = true;
    $scope.apartment = {};


    Apartment.get()
        .success(function(data) {
            $scope.apartments = data;
            $rootScope.loading = false;
        });


    $scope.deleteApartment = function(id) {
        var result = window.confirm('Are you sure you want to delete this apartment?');

        if(result) {
            $rootScope.loading = true;
             Apartment.delete(id)
                .success(function(data) {
                    $scope.apartments = data;
                    $rootScope.loading = false;
                });
        }
    };
});