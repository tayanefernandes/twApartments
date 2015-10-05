angular.module('MaintenanceListCtrl',[])
	.controller('MaintenanceListController',function($scope, $http, MaintenanceRequest){
		
		MaintenanceRequest.listByApartment()
            .success(function(data) {
                $scope.maintenanceList = data;
            });

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

		// delete a todo after checking it
        $scope.deleteMaintenanceRequest = function(id) {
            MaintenanceRequest.delete(id)
                .success(function(data) {
                    $scope.maintenanceList = data;
                });
        };

	});