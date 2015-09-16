// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/apartmentList.html',
            controller: 'ApartmentListController'
        })
        .when('/apartments', {
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
            templateUrl: 'views/apartment.html',
            controller: 'ApartmentController'
        });

    $locationProvider.html5Mode(true);

}]);