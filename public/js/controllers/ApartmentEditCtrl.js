angular.module('twApartments').controller('ApartmentEditController', function($scope, $http, $rootScope, $routeParams, Apartment) {
        $rootScope.isAdmin = true;
    	$rootScope.loading = true;
        $scope.isEditing = $routeParams.apartmentId !== undefined;
        $scope.apartment = {};

        if($scope.isEditing) {
            Apartment.getApartmentById($routeParams.apartmentId)
            .success(function(data){
                $scope.apartment = data;
                $scope.apartment.contractStartDate = new Date(data.contractStartDate);
                if(data.allowedToReturnAfter !== null) {
                     $scope.apartment.allowedToReturnAfter = new Date(data.allowedToReturnAfter);
                }
                $rootScope.loading = false;
            });
        } else {
            $rootScope.loading = false;
        }

        var createApartment = function() {
            $rootScope.loading = true;

            Apartment.create($scope.apartment)
                .success(function(data) {
                    $scope.apartment = {};
                    $scope.apartments = data;
                    $rootScope.loading = false;
                    // showDialogSuccess();
                }).error(function(){
                    // showDialogError();
                });
        };

        var editApartment = function() {
            $rootScope.loading = true;

            Apartment.update($scope.apartment)
                .success(function(data) {
                    $rootScope.loading = false;
                    // showDialogSuccess();
                }).error(function(){
                    // showDialogError();
                });
        };

        $scope.submitForm = function() {
            $scope.submitted = true;

            if($scope.apartmentForm.$invalid) {
                return false;
            }
            if($scope.isEditing) {
                editApartment();
            } else {
                createApartment();
            }

            $scope.submitted = false;
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

        $scope.hasError = function(field) {
            if (field !== undefined && field !== null) {
                if($scope.submitted) {
                    return field.$invalid;
                }
            } else {
                return false;
            }
        };

});