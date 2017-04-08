angular.module("bookApp",["ngRoute","angularFileUpload"])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/books/', {
		templateUrl: 'Content/Partial/book/listBook.html',
		controller: 'getListBookCtrl'
	});

	$routeProvider.when('/books/add/', {
	    templateUrl: 'Content/Partial/book/addBook.html',
	    controller: 'addBookCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});

	$routeProvider.when('/books/update/:bookId', {
	    templateUrl: 'Content/Partial/book/updateBook.html',
	    controller: 'updateBookCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});

	$routeProvider.when('/books/:bookId', {
		templateUrl: 'Content/Partial/book/itemBook.html',
		controller: 'getBookCtrl'
	});

	$routeProvider.when('/category/add/', {
	    templateUrl: 'Content/Partial/book/addCategory.html',
	    controller: 'addCategoryCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});

	$routeProvider.when('/author/add/', {
	    templateUrl: 'Content/Partial/book/addAuthor.html',
	    controller: 'addAuthorCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});

	$routeProvider.when('/publisher/add/', {
	    templateUrl: 'Content/Partial/book/addPublisher.html',
	    controller: 'addPublisherCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});
}])