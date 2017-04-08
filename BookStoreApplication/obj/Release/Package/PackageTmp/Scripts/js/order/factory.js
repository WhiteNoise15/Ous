angular.module("orderApp")
.factory('order', function($http) {
    var orderFactory = {};

    var serviceBase = 'http://localhost:63482/';

    var _getOrderDetails = function() {
        return $http.get(serviceBase + "api/OrderDetails");
    }

    var _addOrderDetails = function (addOrderDetailsModel) {
        return $http.post(serviceBase + "api/OrderDetails", addOrderDetailsModel);
    };

    var _deleteOrderDetails = function (orderDetailsId) {
        return $http.delete(serviceBase + "api/OrderDetails/" + orderDetailsId);
    }

    var _addOrder = function () {
        return $http.post(serviceBase + "api/Order");
    }
    
    var _getUserOrders = function () {
        return $http.get(serviceBase + "api/Order");
    }

    var _getUncorfirmedOrders = function () {
        return $http.get(serviceBase + "api/Order/Uncorfirmed");
    }

    var _updateOrder = function (orderId, updateOrderModel) {
        console.log(updateOrderModel);
        return $http.put(serviceBase + "api/Order/" + orderId, updateOrderModel);
    }

    orderFactory.getOrderDetails = _getOrderDetails;
    orderFactory.addOrderDetails = _addOrderDetails;
    orderFactory.deleteOrderDetails = _deleteOrderDetails;
    orderFactory.addOrder = _addOrder;
    orderFactory.getUserOrders = _getUserOrders;
    orderFactory.getUncorfirmedOrders = _getUncorfirmedOrders;
    orderFactory.updateOrder = _updateOrder;

    return orderFactory;
});