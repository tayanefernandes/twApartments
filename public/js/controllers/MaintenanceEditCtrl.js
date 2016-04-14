angular.module('twApartments').controller('MaintenanceEditController',
 function($scope, $http, $routeParams, $rootScope, MaintenanceRequest, ngDialog) {
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
        $scope.commentSubmitted = false;
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
            return (field.$touched || $scope.commentSubmitted) && field.$invalid;
        } else {
            return false;
        }
    };

    $scope.addComment = function(commentData){
        $scope.commentSubmitted = true;
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

    $scope.submitForm = function(){
        $scope.submitted = true;
        if($scope.maintenanceForm.$invalid) {
            return false;
        }
        $scope.maintenanceRequest.maintenanceRequestId = $routeParams.maintenanceRequestId;
        updateMaintenanceRequest($scope.maintenanceRequest);
    };

    var updateMaintenanceRequest = function(formData) {
        MaintenanceRequest.update(formData)
            .success(function(data){
                showDialogSucess();
            }).error(function(){
                showDialogError();
            });
    };

    var showDialogSucess = function() {
        $scope.modalMessage = '<h3>Maintenance updated successfully</h3>';
        ngDialog.open({
                template: '../views/successTemplate.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                scope: $scope
        }).closePromise.then(function(data){
            window.location.href = "/admin";
        });
    };

    $scope.showDialogError = function() {
        $scope.modalMessage = '<h3>Error!</h3><p>Request not sent. Try again or contact office_admin_poa@thoughtworks.com</p>';
        ngDialog.open({
                template: '../views/errorTemplate.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                scope: $scope
            });
    };
});