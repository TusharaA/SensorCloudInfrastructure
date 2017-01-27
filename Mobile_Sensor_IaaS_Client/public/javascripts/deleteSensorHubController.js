
"use strict"
app.controller('deleteSensorHubController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';
    $scope.imageId = "ami-5ee7443e";
    //$scope.imageId = "ami-c074d7a0";
    var sensors=[];
    $scope.hideCart = true;
    $scope.sensorTypeRegion='Temperature Sensor in NewYork';
    $scope.sensorhubname = "";
    $scope.resultsDetails = true;
    $scope.username = $cookies.get('username');

    $scope.addSensor = function(){
        var typeRegion = $scope.sensorTypeRegion.split("-");

        $scope.hideCart = false;
        for (var i = 0; i < sensors.length; i++) {
            if (sensors[i].type == typeRegion[0] && sensors[i].region == typeRegion[2]) {
                sensors[i].count++;
                break;
            }
        }

        $scope.sensorList = sensors;
    };

    $scope.addSensorHub = function(){
        console.log($scope.imageId);
        $http.post(
            host + 'api/v1/createSensorHub',
            {
                sensorhubname: $scope.sensorhubname,
                addsensors: JSON.stringify($scope.sensorList),
                imageId: $scope.imageId,
                username: $cookies.get('username')
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log(result.statusCode);
                console.log(result.instanceDetails);
                $scope.createdSensors = result.instanceDetails;
                $scope.resultsDetails = false;
            })
            .error(function(error){
                console.log('error')
            });
    }

    $scope.getSensorHubDetails = function(){
        $http.post(
            host + 'api/v1/getAvailableSensorHubDetails',
            {
                username: $cookies.get('username')
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            console.log(result.statusCode + JSON.stringify(data));
            $scope.sensorHubs = result.sensorHubs;
            $scope.resultsDetails = false;
        })
            .error(function(error){
                console.log('error')
            });
    }


    $scope.viewSensorHubDetails = function(){
        $http({
            method : "POST",
            url : host + 'api/v1/getUserSensorHubSensorDetails',
            data : {
                "sensorhubname" : $scope.sensorHub,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            console.log("data:" + JSON.stringify(data));
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hideSensorList = false;
                $scope.sensorlist = data.sensorHubs;
            }
        }).error(function(error) {

        });
    };

    $scope.deleteSensorHub = function(){
        $http({
            method : "POST",
            url : host + 'api/v1/deleteUserSensorHub',
            data : {
                "sensorhubname" : $scope.sensorHub,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            console.log("data:" + JSON.stringify(data));
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hideSensorList = false;
                $scope.deletedSensorlist = $scope.sensorlist;
            }
        }).error(function(error) {

        });
    };

}]);


