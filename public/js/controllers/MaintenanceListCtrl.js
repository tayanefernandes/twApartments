angular.module('MaintenanceListCtrl',[])
	.controller('MaintenanceListController',function($scope, $http, MaintenanceRequest){
		
		MaintenanceRequest.listByApartment()
            .success(function(data) {
                $scope.maintenanceList = data;
            });
	});