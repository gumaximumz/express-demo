

angular.module('app.dtModule', ['datatables'])
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

function DatatableController($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('users')
        .withPaginationType('full_numbers')
        .withOption('rowCallback', rowCallback)
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
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
                someClickHandler(aData);
            });
        });
        return nRow;
    }
}

function DatatableController2($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('username').withTitle('Username'),
    ];
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            dataSrc: "data",
            url: "userserver",
            type:"GET"
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
        .withOption('rowCallback', rowCallback);
        
    

    function someClickHandler(info) {
        getData($scope, $http, info.id);
    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
                someClickHandler(aData);
            });
        });
        return nRow;
    }
}

function getData(scope, http, id) {
    http.get("user/" + id)
        .then(function (response) {
            console.log("PostData...success")
            scope.id = response.data.id;
            scope.username = response.data.username;
            scope.name = response.data.name;
            scope.position = response.data.position;
        });
}