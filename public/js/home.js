angular.module('app', ['ngRoute','app.dtModule'])
    .controller('HomeController', HomeController)
    .controller('AboutController', AboutController)
    .config(function ($routeProvider) {
         $routeProvider
             .when('/', {
                 controller: 'HomeController',
                 templateUrl: 'home.html'
             })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'test.html'
            })
            .when('/about', {
                controller: 'AboutController',
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

function getData(scope,http,id){
    http.get("user/"+id)
    .then(function(response) {
        console.log("PostData...success")
        scope.id = response.data.id;
        scope.username = response.data.username;
        scope.name = response.data.name;
        scope.position = response.data.position;
    });
}


angular.module('app.dtModule',['datatables'])
    .controller('DatatableController', DatatableController)
    .controller('DatatableController2', DatatableController2)
    .config(function ($routeProvider) {
        $routeProvider
        .when('/datatable', {
                templateUrl: 'datatable.html'
            })
        .when('/datatable2', {
                templateUrl: 'datatable2.html'
            })
     });
    
    
    
    
    
    function DatatableController($scope, $http, DTOptionsBuilder, DTColumnBuilder)  {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('users')
        .withPaginationType('full_numbers')
        .withOption('rowCallback', rowCallback);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('username').withTitle('Username'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('position').withTitle('Position')
    ];
    
    function someClickHandler(info) {
        $scope.id = info.id;
        $scope.username = info.username;
        $scope.name = info.name;
        $scope.position = info.position;
    }
    
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function() {
            $scope.$apply(function() {
                someClickHandler(aData);
            });
        });
        return nRow;
    }
    }
    
    function DatatableController2($scope, $http, DTOptionsBuilder, DTColumnBuilder)  {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('users')
        .withPaginationType('full_numbers')
        .withOption('rowCallback', rowCallback);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('username').withTitle('Username'),
    ];
    
    function someClickHandler(info) {
        getData($scope,$http,info.id);
    }
    
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function() {
            $scope.$apply(function() {
                someClickHandler(aData);
            });
        });
        return nRow;
    }
    }

    
    
