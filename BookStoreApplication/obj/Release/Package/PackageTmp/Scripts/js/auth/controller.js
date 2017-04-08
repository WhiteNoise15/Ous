angular.module("authApp")
.controller('signupCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
	$scope.savedSuccessfully = false;
	$scope.messages = [];

    $scope.registration = {
        Email: "",
        Password: "",
        ConfirmPassword: ""
    };

    $scope.signUp = function () {
        auth.registration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $location.path('/login/');
        },
         function (response) {
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             console.log(errors);
             $scope.messages = errors;
         });
    };
}])
.controller('loginCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
	$scope.loginData = {
        username: "",
        password: ""
    };

	$scope.message = "";

    $scope.login = function () {

        auth.login($scope.loginData).then(function (response) {
            $location.path("/books/");

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };
}])
.controller('addAccountCtrl', ['$scope', '$timeout', '$location', 'auth', function ($scope, $timeout, $location, auth) {
    $scope.user = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Roles: []
    }

    $scope.messages = [];
    $scope.savedSuccessfully = false;
  
    $scope.addUser = function () {
        console.log($scope.user);
        auth.addUser($scope.user).then(function () {
            $scope.savedSuccessfully = true;
            startTimer();
        }, function (response) {
            var errors = [];
            for (var key in response.data.ModelState) {
                for (var i = 0; i < response.data.ModelState[key].length; i++) {
                    errors.push(response.data.ModelState[key][i]);
                }
            }
            $scope.messages = errors;
        })
    }

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/books/');
        }, 2000);
    }

}])