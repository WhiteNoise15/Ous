angular.module("orderApp",["ngRoute"])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/basket/', {
		templateUrl: 'Content/Partial/order/basket.html',
		controller: 'orderDetailsCtrl',
		resolve: {
		    loginrequired: function (auth) {
		        return auth.userLoginRequired();
		    }
		}
	});

	$routeProvider.when('/orders/', {
	    templateUrl: 'Content/Partial/order/userOrders.html',
	    controller: 'orderCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.userLoginRequired();
	        }
	    }
	});

	$routeProvider.when('/orders/uncorfirmed/', {
	    templateUrl: 'Content/Partial/order/orders.html',
	    controller: 'monitoringOrdersCtrl',
	    resolve: {
	        loginrequired: function (auth) {
	            return auth.managerLoginRequired();
	        }
	    }
	});
}])