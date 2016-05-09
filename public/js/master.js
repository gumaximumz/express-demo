
angular.module('app', ['ngRoute', 'app.dtModule'])
    .controller('HomeController', HomeController)
    .controller('AboutController', AboutController)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {

                templateUrl: 'home.html'
            })
            .when('/home', {

                templateUrl: 'test.html'
            })
            .when('/about', {

                templateUrl: 'about.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

function HomeController($scope) {
    $scope.test = 'Hello world!'
}

function AboutController($scope, $http) {
    console.log("PostData...")

    $scope.SendData = function () {

        getData($scope, $http, $scope.userId)
    }
}





