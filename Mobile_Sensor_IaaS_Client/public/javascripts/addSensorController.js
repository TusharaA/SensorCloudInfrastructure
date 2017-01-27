
"use strict"
app.controller('addSensorController',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    $scope.hidemessage = true;
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';
    $scope.getSensorsAvailable = function () {
        $http.get(
            host + 'api/v1/getAvailableSensorTypesDetails',
            { cors: true }
        ).success(function(data){
            $scope.hidemessage = true;
            var result = JSON.parse(JSON.stringify(data));
            console.log("Result: " + result.statusCode + "data:" + JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.sensorlist = result.instanceDetails;
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.addSensor = function(sensorType,region) {
        $http.post(
            host + 'api/v1/addSensorType',
            {
                'SensorType' : $scope.sensorType,
                'Region' : $scope.region
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            console.log("Result: " + result.statusCode);
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "Sensor Type " + $scope.sensorType + " for region " + $scope.region + " is created successfully";
            }
        })
            .error(function(error){
                console.log('error')
            })
    };
}]);