angular.module('twApartments').controller('MaintenanceListController',function($scope, $http, $rootScope, MaintenanceRequest, Apartment){
		$rootScope.isAdmin = true;
		$rootScope.loading = true;
		MaintenanceRequest.listWithApartment()
            .success(function(data) {
                $scope.maintenanceList = data;

                $scope.apartments = {};
			    angular.forEach($scope.maintenanceList, function(maintenance){
		            $scope.apartments[maintenance._apartment._id] = maintenance._apartment;
			    });
			    $rootScope.loading = false;
            });

        $scope.filterByApartment = 'all';

        $scope.toDoFilter = function (maintenance) {
		    return !maintenance.isSolved && maintenance.comments.length === 0;
		};

		$scope.doingFilter = function (maintenance) {
		    return maintenance.comments.length > 0 && !maintenance.isSolved;
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