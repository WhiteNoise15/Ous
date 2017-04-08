angular.module("recordApp", ["ngRoute"])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.when('/records/add/', {
        templateUrl: 'Content/Partial/record/addRecord.html',
        controller: 'addRecordCtrl',
        resolve: {
            loginrequired: function (auth) {
                return auth.userLoginRequired();
            }
        }
    });
    $routeProvider.when('/records/', {
        templateUrl: 'Content/Partial/record/getRecords.html',
        controller: 'getRecordsCtrl',
        resolve: {
            loginrequired: function (auth) {
                return auth.userLoginRequired();
            }
        }
    });
}])