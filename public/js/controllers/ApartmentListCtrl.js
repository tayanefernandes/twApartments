angular.module('twApartments').controller('ApartmentListController', function($scope, $http, $rootScope, Apartment) {
		$rootScope.isAdmin = false;
		$rootScope.loading = true;

        Apartment.get()
            .success(function(data) {
            	console.log(data);
                $scope.apartments = data;
                $rootScope.loading = false;
            });

});