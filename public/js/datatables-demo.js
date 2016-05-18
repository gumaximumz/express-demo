

angular.module('app.dtModule', ['datatables', 'datatables.bootstrap', 'ngResource','dt3Module'])
    .controller('DatatableController', DatatableController)
    .controller('DatatableController2', DatatableController2)
    .controller('DatatableController3', DatatableController3)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/datatable', {
                templateUrl: 'datatable.html'
            })
            .when('/datatable2', {
                templateUrl: 'datatable2.html'
            })
            .when('/datatable3', {
                templateUrl: 'datatable3.html'
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
        type: "GET"
    })
        .withBootstrap()
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting', [0, 'asc']) // for default sorting column // here 0 means first column
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

function DatatableController3($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;

    vm.dtColumns = [
        DTColumnBuilder.newColumn('username').withTitle('Username'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('position').withTitle('Position'),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(actionsDetail),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(actionsEdit),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(actionsDelete)
    ];

    vm.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
        dataSrc: "data",
        url: "userserver",
        type: "GET"
    })
        .withBootstrap()
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('aaSorting', [0, 'asc'])
        .withOption('rowCallback', rowCallback);

    $scope.status = 'Detail';
    $('#edit').click(() => {
        console.log(id);
    })
    
    function actionsDetail(cellValue, options, rowObjects) {
        return '<a href="#/datatable/detail"> class="btn btn-xs btn-warning" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-pencil"></span></a>';
    }

    function actionsEdit(cellValue, options, rowObjects) {
        return '<a href="#/datatable/edit"> class="btn btn-xs btn-warning" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-pencil"></span></a>';
    }

    function actionsDelete(cellValue, options, rowObjects) {
        return '<a onclick="rowDelete(' + rowObjects["id"] + ')" class="btn btn-xs btn-danger" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-trash"></span></a>';
    }




    function someClickHandler(info) {
        getData($scope, $http, info.id, 'Detail');
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

function rowEdit(id) {
    console.log(id);
}

function rowDelete(id) {
    console.log(id);
}

function getData(scope, http, id, status) {
    http.get("user/" + id)
        .then(function (response) {
            console.log("PostData...success")
            scope.status = status;
            scope.id = response.data.id;
            scope.username = response.data.username;
            scope.name = response.data.name;
            scope.position = response.data.position;
        });
}
