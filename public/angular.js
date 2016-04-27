angular.module('app', ['ngRoute'])
    .controller('HomeController', HomeController)
    .config(function ($routeProvider) {
         $routeProvider
             .when('/', {
                 controller: 'HomeController',
                 templateUrl: '/home.html'
             })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: '/home.html'
            })
            .when('/about', {
                controller: 'HomeController',
                templateUrl: '/about.html'
            })
             .otherwise({
                  redirectTo: '/'
             });
     });
     
function HomeController($scope) {
    $scope.test = 'HI EIEI'
}