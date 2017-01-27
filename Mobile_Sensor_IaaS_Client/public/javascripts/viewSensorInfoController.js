"use strict"
app.controller('viewSensorInfoController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    var host = $cookies.get('serverHost');

    $scope.hideSensorManager = true;
    $scope.getUserAllSensorDetails = function () {
        $http({
            method : "POST",
            url : host + 'api/v1/getUserSensorDetails',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.sensorlist = data.instanceDetails;
            }
        }).error(function(error) {

        });
    };
}
]);