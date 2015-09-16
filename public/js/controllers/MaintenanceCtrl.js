angular.module('MaintenanceCtrl', [])

	.controller('MaintenanceController', function($scope, $http, $routeParams, MaintenanceRequest) {
		$scope.formData = {};

        $scope.createMaintenanceRequest = function() {
        	$scope.formData.apartmentId = $routeParams.apartmentId;
            MaintenanceRequest.create($scope.formData)
                .success(function(data) {
                    console.log(data);
                });
        };

    });