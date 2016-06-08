
angular.module('dtModule3', ['ngAnimate'])
    .controller('DetailController', DetailController)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/datatable3/detail', {
                templateUrl: 'detail.html'
            })
    });

function DetailController($scope, $http) {
    var vm = this;
    $scope.templates =
        [{ name: 'Detail', url: 'detail.html' },
            { name: 'Create', url: 'detail.html' }];
    $scope.template = $scope.templates[0];
    getData($scope, $http, 1);
}