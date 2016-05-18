
angular.module('dt3Module', [])
    .controller('DetailController', DatatableController3)
    .controller('EditController', DatatableController3)
    .config(function ($routeProvider) {
        $routeProvider
            .when('datatable3/detail', {
                templateUrl: 'detail.html'
            })
            .when('datatable3/edit', {
                templateUrl: 'edit.html'
            })
    });
    
    function DetailController($scope, $http) {
    var vm = this;
    getData($scope, $http, info.id, 'Detail');
    }
    
    function EditController($scope, $http) {
    var vm = this;
    getData($scope, $http, info.id, 'Edit');
    }