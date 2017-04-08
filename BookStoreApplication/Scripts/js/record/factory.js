angular.module("recordApp")
.factory('record', function ($http) {
    var recordFactory = { };

    var serviceBase = 'http://localhost:63482/';

    var _getRecords = function () {
        return $http.get(serviceBase + "api/Record/");
    }

    var _addRecord = function (record) {
        console.log(record);
        return $http.post(serviceBase + "api/Record/", record);
    }

    var _deleteRecord = function (recordId) {
        return $http.delete(serviceBase + "api/Record/" + recordId);
    }

    recordFactory.addRecord = _addRecord;
    recordFactory.getRecords = _getRecords;
    recordFactory.deleteRecord = _deleteRecord;

    return recordFactory;
})