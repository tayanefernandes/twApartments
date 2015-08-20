// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // apartments page that will use the ApartmentController
        .when('/apartments', {
            templateUrl: 'views/apartment.html',
            controller: 'ApartmentController'
        });

    $locationProvider.html5Mode(true);

}]);