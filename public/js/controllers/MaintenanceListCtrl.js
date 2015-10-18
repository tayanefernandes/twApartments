angular.module('MaintenanceListCtrl',[])
	.controller('MaintenanceListController',function($scope, $http, MaintenanceRequest, Apartment){
		
		MaintenanceRequest.listWithApartment()
            .success(function(data) {
                $scope.maintenanceList = data;

                $scope.apartments = {};
			    angular.forEach($scope.maintenanceList, function(maintenance){
		            $scope.apartments[maintenance._apartment._id] = maintenance._apartment;
			    });
            });

        $scope.filterByApartment = 'all';

        $scope.toDoFilter = function (maintenance) {
        	console.log(maintenance.isSolved);
		    return !maintenance.isSolved;
		};

		$scope.doingFilter = function (maintenance) {
		    return maintenance.comments.length > 0;
		};

		$scope.doneFilter = function (maintenance) {
		    return maintenance.isSolved;
		};

		$scope.filterMaintenance = function(maintenance) {
			return $scope.filterByApartment === 'all' ? true : $scope.filterByApartment === maintenance._apartment._id;
		};

		// delete a todo after checking it
        $scope.deleteMaintenanceRequest = function(id) {
            MaintenanceRequest.delete(id)
                .success(function(data) {
                    $scope.maintenanceList = data;
                });
        };

	});