// public/js/appRoutes.js
    angular.module('twApartments').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/apartmentList.html',
            controller: 'ApartmentListController'
        })
        .when('/maintenance/:apartmentId', {
            templateUrl: 'views/maintenanceRequest.html',
            controller: 'MaintenanceController'
        })
        .when('/admin', {
            templateUrl: 'views/maintenanceList.html',
            controller: 'MaintenanceListController'
        })
        .when('/admin/apartments', {
            templateUrl: 'views/apartmentAdmin.html',
            controller: 'ApartmentAdminController'
        })
        .when('/admin/apartment/edit/:apartmentId', {
            templateUrl: 'views/apartmentEdit.html',
            controller: 'ApartmentEditController'
        })
        .when('/admin/apartment/create', {
            templateUrl: 'views/apartmentEdit.html',
            controller: 'ApartmentEditController'
        })
        .when('/admin/maintenance/edit/:maintenanceRequestId', {
            templateUrl: 'views/maintenanceEdit.html',
            controller: 'MaintenanceEditController'
        });

    $locationProvider.html5Mode(true);

}]);