angular.module('ApartmentListCtrl', [])

	.controller('ApartmentListController', function($scope, $http, Apartment) {

        Apartment.get()
            .success(function(data) {
            	console.log(data);
                $scope.apartments = data;
            });

});