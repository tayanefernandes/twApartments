angular.module('twApartments').controller('ApartmentListController', function($scope, $http, $rootScope, Apartment) {
        $rootScope.isAdmin = false;
        $rootScope.loading = true;

        Apartment.get()
            .success(function(data) {
                $scope.apartments = data;
                $rootScope.loading = false;
            });

});