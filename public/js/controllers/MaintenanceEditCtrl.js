angular.module('twApartments').controller('MaintenanceEditController', function($scope, $http, $routeParams, $rootScope, MaintenanceRequest, ngDialog) {
	$scope.formData = {};
    $rootScope.isAdmin = true;
    $rootScope.loading = true;

    MaintenanceRequest.getMaintenanceById($routeParams.maintenanceRequestId)
        .success(function(data){
            $scope.maintenanceRequest = data;
            $rootScope.loading = false;
        });

    $scope.openCommentDialog = function() {
        ngDialog.open({
            template: '../views/comment_template.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            scope: $scope
        });
    };

    var openError = function (message) {
        $scope.showError = true;
        $scope.errorMessage = message;
    };

    $scope.closeError = function() {
        $scope.showError = false; 
    }; 

    $scope.addComment = function(commentData){
        MaintenanceRequest.addComment(commentData, $routeParams.maintenanceRequestId)
            .success(function(data){
                $scope.maintenanceRequest.comments = data.comments;
                ngDialog.closeAll();
            }).error(function(){
                openError('Error. Try again!');
            });
    };
});