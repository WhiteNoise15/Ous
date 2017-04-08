angular.module("recordApp")
.controller('addRecordCtrl', ['$scope','$routeParams','$rootScope','$location','record', function ($scope, $routeParams, $rootScope, $location, record) {

    $scope.savedSuccessfully = false;

    $scope.messages = [];

    $scope.record = {
        Params: new Array(16)
    }

    $scope.addBook = function () {
        record.addRecord($scope.record).then(function () {
            $location.path('/records/');
            console.log("Worked");
        });
    }
}])
.controller('getRecordsCtrl', ['$scope', '$routeParams', '$rootScope', '$location', 'record', function ($scope, $routeParams, $rootScope, $location, record) {

    $scope.savedSuccessfully = false;;

    $scope.messages = [];

    $scope.delete = function (recordId) {
        record.deleteRecord(recordId).then(function () {
            for (var i = 0; i < $scope.records.length; i++) {
                if ($scope.records[i].Id == recordId) {
                    $scope.records.splice(i, 1);
                }
            }
            if ($scope.records.length == 0) {
                $scope.savedSuccessfully = false;
            }
        })
    }

    $scope.records;
    
    $scope.go = function () {
        record.getRecords().then(function (result) {
            $scope.records = result.data;
            if ($scope.records.length > 0) {
                $scope.savedSuccessfully = true;
            }
        });
    }

    $scope.go();

}])