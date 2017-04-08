angular.module("app")
// Контроллер для шапки сайта
.controller('headerCtrl', ['$scope', 'auth', '$location', function ($scope, auth, $location) {
    $scope.authentication = auth.authentication;
    $scope.logOut = function () {
        auth.logOut();
        $location.path('/login/');
    }
}])
// Контроллер для sidebar