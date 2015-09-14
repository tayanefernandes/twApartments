angular.module('ApartmentListCtrl', [])

	.controller('ApartmentListController', function($scope, $http, Apartment) {

        Apartment.get()
            .success(function(data) {
                $scope.apartments = data;
            });

});