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
                    showDialogSuccess();
                }).error(function(){
                    showDialogError();
                });
        };

        var showDialogSuccess = function() {
            $scope.modalMessage = '<h3>Maintenance sent successfully!</h3><p>Request sent to office_admin_poa@thoughtworks.com. We will notify you as soon as possible.</p>';
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
    });