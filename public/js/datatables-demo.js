

angular.module('app.dtModule', ['datatables', 'datatables.bootstrap', 'ngAnimate'])
    .controller('DatatableController', DatatableController)
    .controller('DatatableController2', DatatableController2)
    .controller('DatatableController4', DatatableController4)
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

function DatatableController4($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
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

    $scope.status = '';

    $scope.saveUser = function (data) {
        if ($scope.id == undefined) {
            create(data);
            return;
        }
        data['id'] = $scope.id
        edit(data);
    }

    $scope.detailUser = function (id) {
        $scope.status = 'Details';
        $scope.templates =
            [{ name: 'datatables3/detail.html', url: 'datatables3/detail.html' }];
        $scope.template = $scope.templates[0];
        getData($scope, $http, id == undefined ? $scope.id : id);
    }

    $scope.editUser = function () {
        $scope.status = 'Edit';
        $scope.templates =
            [{ name: 'datatables3/edit.html', url: 'datatables3/edit.html' }];
        $scope.template = $scope.templates[0];
        $scope.user = $scope;
    }

    $scope.createUser = function () {
        $scope.status = 'Create';
        $scope.templates =
            [{ name: 'datatables3/create.html', url: 'datatables3/create.html' }];
        $scope.template = $scope.templates[0];
        getData($scope, $http, 0);
    }

    function create(data) {
        $http({
            url: 'create',
            method: "POST",
            data: data
        })
            .then(function (response) {
                $scope.detailUser(response.data.id);
                $scope.dtInstance.rerender();
            });
    }

    function edit(data) {
        $http({
            url: 'edit',
            method: "POST",
            data: data
        })
            .then(function (response) {
                $scope.detailUser(response.data.id);
                $scope.dtInstance.rerender();
            });
    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
                $scope.detailUser(aData.id);
            });
        });
        return nRow;
    }

    function actionsDetail(cellValue, options, rowObjects) {
        return '<a ng-click="detailUser(' + rowObjects['id'] + ')"  class="btn btn-xs btn-info" style="width:100%;" title="Detail" "><span class="glyphicon glyphicon-file"></span></a>';
    }

    function actionsEdit(cellValue, options, rowObjects) {
        return '<a ng-click="editUser(' + rowObjects['id'] + ')"  class="btn btn-xs btn-warning" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-file"></span></a>';
    }

    function actionsDelete(cellValue, options, rowObjects) {
        return '<a ng-click="deleteUser(' + rowObjects['id'] + ')"  class="btn btn-xs btn-danger" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-file"></span></a>';
    }

    /*function actionsDetail(cellValue, options, rowObjects) {
        return '<a href="#/datatable3/detail" class="btn btn-xs btn-info" style="width:100%;" title="Detail" "><span class="glyphicon glyphicon-file"></span></a>';
    }
    
    function actionsEdit(cellValue, options, rowObjects) {
        return '<a href="#/datatable3/edit"  class="btn btn-xs btn-warning" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-file"></span></a>';
    }

    function actionsDelete(cellValue, options, rowObjects) {
        return '<a href="#/datatable3/detail"  class="btn btn-xs btn-danger" style="width:100%;" title="Delete" "><span class="glyphicon glyphicon-file"></span></a>';
    }*/

}

function getData(scope, http, id) {
    http.get("user/" + id)
        .then(function (response) {
            scope.id = response.data.id;
            scope.username = response.data.username;
            scope.name = response.data.name;
            scope.position = response.data.position;
        });
}