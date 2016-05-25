
angular.module('app', ['ngRoute', 'app.dtModule'])
    .controller('DatatableController3', function ($scope, $mdDialog) {
        $scope.openFromLeft = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Opening from the left')
                    .textContent('Closing to the right!')
                    .ariaLabel('Left to right demo')
                    .ok('Nice!')
                    // You can specify either sting with query selector
                    .openFrom('#left')
                    // or an element
                    .closeTo(angular.element(document.querySelector('#right')))
            );
        };
    })
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





