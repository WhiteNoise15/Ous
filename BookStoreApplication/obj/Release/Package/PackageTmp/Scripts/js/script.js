var loginRequired = function ($location, $q) {
    var deferred = $q.defer();
    if (!userIsAuthenticated()) {
        deferred.reject()
        $location.path('/login');
    } else {
        deferred.resolve()
    }
    return deferred.promise;
}