angular.module('MaintenanceCtrl', ['ngDialog'])

	.controller('MaintenanceController', function($scope, $http, $routeParams, MaintenanceRequest, ngDialog) {
		$scope.formData = {};

        MaintenanceRequest.getApartmentById($routeParams.apartmentId)
            .success(function(data){
                $scope.apartmentRelated = data;
            });

        $scope.submitForm = function(){
            $scope.submitted = true;
            if($scope.maintenanceForm.$invalid) {
                return false;
            }
            $scope.formData.apartmentId = $routeParams.apartmentId;

            createMaintenanceRequest($scope.formData);
        };

        $scope.hasError = function(field) {
            return (field.$touched || $scope.submitted) && field.$invalid;
        };


        var createMaintenanceRequest = function(formData) {      
            MaintenanceRequest.create(formData)
                .success(function(data){
                    showDialogSucess();
                }).error(function(){
                    showDialogError();
                });
        };

        var showDialogSucess = function() {
            ngDialog.open({
                    template: '../views/success-template.html',
                    className: 'ngdialog-theme-default',
                    showClose: false
                }).closePromise.then(function(data){
                    window.location.href = "/";
                });
        };

        $scope.showDialogError = function() {
           ngDialog.open({
                    template: '../views/error-template.html',
                    className: 'ngdialog-theme-default',
                    showClose: false
                });
        };

        
    });