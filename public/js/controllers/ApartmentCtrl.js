angular.module('twApartments').controller('ApartmentController', function($scope, $http, $rootScope, Apartment) {
        $rootScope.isAdmin = true;
    	$rootScope.loading = true;
        $scope.apartment = {};


        Apartment.get()
            .success(function(data) {
                $scope.apartments = data;
                $rootScope.loading = false;
            });


        var createApartment = function() {
            $rootScope.loading = true;

            Apartment.create($scope.apartment)
                .success(function(data) {
                    $scope.apartment = {};
                    $scope.apartments = data;
                    $rootScope.loading = false;
                    showDialogSuccess();
                }).error(function(){
                    showDialogError();
                });
        };

        $scope.submitForm = function(){
            $scope.submitted = true;
            if($scope.apartmentForm.$invalid) {
                return false;
            }
            createApartment();
        };

        var showDialogSuccess = function() {
            $scope.modalMessage = '<h3>Apartment created successfully!</h3>';
            ngDialog.open({
                template: '../views/successTemplate.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                scope: $scope
            }).closePromise.then(function(data){
                window.location.href = "/";
            });
        };

        var showDialogError = function() {
           ngDialog.open({
                template: '../views/errorTemplate.html',
                className: 'ngdialog-theme-default',
                showClose: false
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

        $scope.hasError = function(field) {
            if (field !== undefined && field !== null) {
                return (field.$touched || $scope.submitted) && field.$invalid;
            } else {
                return false;
            }
        };

});