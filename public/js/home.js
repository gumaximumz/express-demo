angular.module('app', ['ngRoute'])
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
            
    $http.get("user/"+$scope.userId)
    .then(function(response) {
        console.log("PostData...success")
        $scope.id = response.data.id;
        $scope.userName = response.data.userName;
        $scope.name = response.data.name;
        $scope.position = response.data.position;
    });
    }
}


angular.module('ngDB',[])
    .controller('DatatableController', DatatableController)
    .config(function ($routeProvider) {
        $routeProvider
        .when('/datatable', {
                controller: 'DatatableController',
                templateUrl: 'datatable.html'
            })
     });
    
    function DatatableController($scope, $http)  {
    console.log("test");
    }