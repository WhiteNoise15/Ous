angular.module("app", ["ngRoute", "authApp", "recordApp"])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/records' });
    // ��������
    console.log("wsork");
}]);