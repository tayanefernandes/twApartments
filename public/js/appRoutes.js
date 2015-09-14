// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/apartmentList.html',
            controller: 'ApartmentListController'
        })

        .when('/apartmentsAdmin', {
            templateUrl: 'views/apartment.html',
            controller: 'ApartmentController'
        })
        .when('/apartments', {
            templateUrl: 'views/apartmentList.html',
            controller: 'ApartmentListController'
        })
        .when('/maintenance/:apartmentId', {
            templateUrl: 'views/maintenance.html',
            controller: 'MaintenanceController'
        })
        .when('/admin', {
            templateUrl: 'views/maintenanceList.html',
            controller: 'MaintenanceListController'
        });

    $locationProvider.html5Mode(true);

}]);