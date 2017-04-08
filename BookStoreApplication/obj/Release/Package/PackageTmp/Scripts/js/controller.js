angular.module("app")
.controller('headerCtrl', ['$scope', 'auth', 'order','$location', function($scope, auth, order, $location) {
    $scope.authentication = auth.authentication;

    $scope.logOut = function () {
        auth.logOut();
        $location.path('/books/');
    }
}])
.controller('pageCtrl', ['$scope', 'auth', function($scope, auth) {
    $scope.authentication = auth.authentication;
}])