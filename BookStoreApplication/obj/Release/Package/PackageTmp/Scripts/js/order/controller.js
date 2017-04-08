angular.module("orderApp")
.controller('handlerElementsBasket', function ($scope, $rootScope, $location, order) {
    $scope.orderDetailsCount = null;

    $scope.getOrderDetails = function () {
        order.getOrderDetails().then(function (response) {
            $scope.orderDetailsCount = response.data.length;
        })
    };

    $scope.$on("addToBasket", function (event, args) {
        order.addOrderDetails({ idBook: args.book.Id }).then(function (response) {
            console.log("Good");
        })
        $scope.orderDetailsCount += 1;
    });

    $scope.$on("deleteFromBasket", function () {
        $scope.orderDetailsCount -= 1;
    });

    $scope.$on("deleteBook", function () {
        $scope.getOrderDetails();
    });

    $scope.$on("addOrder", function () {
        $scope.orderDetailsCount = 0;
    });

    $scope.getOrderDetails();
})
.controller('orderDetailsCtrl', function ($scope, $rootScope, $location, order) {
    $scope.orderDetails = null;

    $scope.getOrderDetails = function () {
        order.getOrderDetails().then(function (response) {
            $scope.orderDetails = response.data;
        })
    }

    $scope.deleteOrderDetails = function (orderDetail) {
        order.deleteOrderDetails(orderDetail.Id).then(function () {
            $rootScope.$broadcast("deleteFromBasket");
            for (var i = 0; i < $scope.orderDetails.length; i++) {
                if ($scope.orderDetails[i].Id == orderDetail.Id) {
                    $scope.orderDetails.splice(i, 1);
                }
            }
        })
    }

    $scope.getSumPrice = function () {
        if ($scope.orderDetails == null) {
            return 0;
        }
        else {
            var sum = 0;
            for (var i = 0; i < $scope.orderDetails.length; i++)
                sum += $scope.orderDetails[i].Book.Price;
            return sum;
        }
    }

    $scope.addOrder = function () {
        order.addOrder().then(function () {
            $location.path("/orders/");
            $rootScope.$broadcast("addOrder");
        });
    }

    $scope.getOrderDetails();
})
.controller('orderCtrl', function ($scope, $rootScope, $location, order) {
    $scope.orders = null;

    var getOrders = function () {
        order.getUserOrders().then(function (response) {
            $scope.orders = response.data;
        })
    }

    $scope.getSumOrder = function (order) {
        console.log(order.Confirmed);
        if (order == undefined) {
            return 0;
        }
        sum = 0;
        for (var j = 0; j < order.OrderDetails.length; j++) {
            sum += order.OrderDetails[j].Book.Price;
        }
        return sum;
    }

    $scope.getSumPrice = function () {
        if ($scope.orders == null) {
            return 0;
        }
        else {
            var sum = 0;
            for (var i = 0; i < $scope.orders.length; i++) {
                for (var j = 0; j < $scope.orders[i].OrderDetails.length; j++) {
                    sum += $scope.orders[i].OrderDetails[j].Book.Price;
                }
            }
            return sum;
        }
    }
    
    getOrders();
})
.controller('monitoringOrdersCtrl', function ($scope, $rootScope, $location, order) {
    $scope.orders = null;

    var getOrders = function () {
        order.getUncorfirmedOrders().then(function (response) {
            $scope.orders = response.data;
        })
    }

    $scope.getSumOrder = function (order) {
        if (order == undefined) {
            return 0;
        }
        sum = 0;
        for (var j = 0; j < order.OrderDetails.length; j++) {
            sum += order.OrderDetails[j].Book.Price;
        }
        return sum;
    }

    $scope.updateOrder = function (orderId, flag) {

        order.updateOrder(orderId, { Confirmed: flag }).then(function () {
            for (var i = 0; i < $scope.orders.length; i++) {
                if ($scope.orders[i].Id == orderId) {
                    $scope.orders.splice(i, 1);
                }
            }
        })
    }

    getOrders();
})