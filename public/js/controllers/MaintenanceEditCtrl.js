angular.module('MaintenanceEditCtrl', ['ngDialog'])

	.controller('MaintenanceEditController', function($scope, $http, $routeParams, $rootScope, MaintenanceRequest, ngDialog) {
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
                    scope: $scope,
                    controller: 'MaintenanceEditController'
                });
        };

        $scope.addComment = function(){
            console.log('controller===> ', $scope.commentData);
            MaintenanceRequest.addComment($scope.commentData, $routeParams.maintenanceRequestId)
                .success(function(data){
                    alert('ok');
                    closeThisDialog();
                }).error(function(){
                    alert('erro');
                });
        };

        // $scope.submitForm = function(){
        //     if($scope.maintenanceForm.$invalid) {
        //         return false;
        //     }
        //     $scope.formData.apartmentId = $routeParams.apartmentId;

        //     createMaintenanceRequest($scope.formData);
        // };

        // $scope.hasError = function(field) {
        //     return (field.$touched || $scope.submitted) && field.$invalid;
        // };


        // var createMaintenanceRequest = function(formData) { 
        //     formData.apartmentRelated =  $scope.apartmentRelated;   
        //     MaintenanceRequest.create(formData)
        //         .success(function(data){
        //             showDialogSucess();
        //         }).error(function(){
        //             showDialogError();
        //         });
        // };

        // var showDialogSucess = function() {
        //     ngDialog.open({
        //             template: '../views/success-template.html',
        //             className: 'ngdialog-theme-default',
        //             showClose: false
        //         }).closePromise.then(function(data){
        //             window.location.href = "/";
        //         });
        // };

        // $scope.showDialogError = function() {
        //    ngDialog.open({
        //             template: '../views/error-template.html',
        //             className: 'ngdialog-theme-default',
        //             showClose: false
        //         });
        // };

        
    });