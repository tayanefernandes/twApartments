angular.module('MaintenanceListCtrl',[])
	.controller('MaintenanceListController',function($scope, $http, MaintenanceRequest){
		
		MaintenanceRequest.get()
            .success(function(data) {
                $scope.maintenanceList = data;
            });
	});