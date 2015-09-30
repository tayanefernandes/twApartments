angular.module('MaintenanceCtrl', ['ngDialog'])

	.controller('MaintenanceController', function($scope, $http, $routeParams, MaintenanceRequest, ngDialog) {
		$scope.formData = {};

        $scope.createMaintenanceRequest = function() {
        	$scope.formData.apartmentId = $routeParams.apartmentId;
            MaintenanceRequest.create($scope.formData)
                .success(function(data) {
                    ngDialog.open({
                        template: '<p>my template</p>',
                        plain: true,
                        className: 'ngdialog-theme-default'
                    });
                }).error(function(data) {
                    alert(':(');
                });
        };

        MaintenanceRequest.getApartmentById($routeParams.apartmentId)
            .success(function(data){
                $scope.apartmentRelated = data;
            });

    });