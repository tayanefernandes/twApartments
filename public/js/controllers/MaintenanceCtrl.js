angular.module('twApartments').controller('MaintenanceController', function($scope, $http, $routeParams, $rootScope, MaintenanceRequest, ngDialog) {
		$scope.formData = {};
        $rootScope.loading = true;

        MaintenanceRequest.getApartmentById($routeParams.apartmentId)
            .success(function(data){
                $scope.apartmentRelated = data;
                $rootScope.loading = false;
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
            formData.apartmentRelated =  $scope.apartmentRelated;   
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