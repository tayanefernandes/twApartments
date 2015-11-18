angular.module('twApartments').controller('MaintenanceEditController', function($scope, $http, $routeParams, $rootScope, MaintenanceRequest, ngDialog) {
	$scope.formData = {};
    $rootScope.isAdmin = true;
    $rootScope.loading = true;
    $scope.commentForm = {};

    MaintenanceRequest.getMaintenanceById($routeParams.maintenanceRequestId)
        .success(function(data){
            $scope.maintenanceRequest = data;
            $rootScope.loading = false;
        });

    $scope.openCommentDialog = function() {
        $scope.submitted = false;
        ngDialog.open({
            template: '../views/commentTemplate.html',
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

    $scope.hasError = function(field) {
        if (field !== undefined) {
            return (field.$touched || $scope.submitted) && field.$invalid;
        } else {
            return false;
        }
    };

    $scope.addComment = function(commentData){
        $scope.submitted = true;
        if($scope.commentForm.form.$invalid) {
            return false;
        }
        MaintenanceRequest.addComment(commentData, $routeParams.maintenanceRequestId)
            .success(function(data){
                $scope.maintenanceRequest.comments = data.comments;
                ngDialog.closeAll();
            }).error(function(){
                openError('Error. Try again!');
            });
    };
});