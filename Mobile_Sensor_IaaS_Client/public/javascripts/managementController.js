"use strict"
app.controller('managementController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';
     //$scope.imageId = "ami-c074d7a0";
    $scope.imageId = "ami-5ee7443e";
    $scope.hideSensorManager = true;
    $scope.hideMonitoringDetails = true;
    $scope.hideGraph = true;
    $scope.hideErrormessage = true;
    $scope.hideGraphDetails = true;
    $scope.hideData =true;

    $scope.getUserSensorDetails = function () {
        $http({
            method : "POST",
            url : '/listuserSensorDetails',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.sensorlist = data.sensorlist;
            }
        }).error(function(error) {

        });
    };

    $scope.hideStop = false;
    $scope.hideStart = false;
    $scope.manageSensor = function (sensorInfo) {
        $scope.selectedSensor = sensorInfo;
        if(sensorInfo.Status == "running"){

            $scope.hideStop = false;
            $scope.hideStart = true;
        } else if(sensorInfo.Status == "stopped"){
            $scope.hideStart = false;
            $scope.hideStop = true;
        }
    };

    $scope.chooseSensorHub = function () {
        $http({
            method : "POST",
            url : '/listsensorhub',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hubnamelist = data.hubnamelist;
            }
        }).error(function(error) {

        });
    };

    $scope.getSensorTypeCount = function(){
        $http({
            method : "POST",
            url : '/getSensorTypeCount',
            data : {
                "hubname" : $scope.hubname,
                "sensorType": $scope.sensorType,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.sensorTypeCount = data.count;
            }
        }).error(function(error) {

        });
    };

    $scope.addedResultsDetails = true;
    $scope.deletedResultsDetails = true;
    $scope.autoscale = function(){

        if($scope.minimumCount > $scope.sensorTypeCount) {
            $http.post(
                host + 'api/v1/addToSensorHub',
                //'http://localhost:5000/api/v1/addToSensorHub',
                {
                    sensorhubname: $scope.hubname,
                    sensorType: $scope.sensorType,
                    region: $scope.sensorRegion,
                    imageId: $scope.imageId,
                    username: $cookies.get('username'),
                    count: $scope.minimumCount - $scope.sensorTypeCount
                },
                {cors: true}
            )
                .success(function (data) {
                    var result = JSON.parse(JSON.stringify(data));
                    console.log(result.statusCode);
                    console.log(result.instanceDetails);
                    $scope.addedSensors = result.instanceDetails;
                    $scope.addedResultsDetails = false;
                })
                .error(function (error) {
                    console.log('error')
                });

        } else if($scope.maximumCount < $scope.sensorTypeCount) {
            $http.post(
                host + 'api/v1/deleteFromSensorHub',
                //'http://localhost:5000/api/v1/deleteFromSensorHub',
                {
                    sensorhubname: $scope.hubname,
                    sensorType: $scope.sensorType,
                    imageId: $scope.imageId,
                    username: $cookies.get('username'),
                    count:  $scope.sensorTypeCount - $scope.maximumCount
                },
                {cors: true}
            )
                .success(function (data) {
                    var result = JSON.parse(JSON.stringify(data));
                    console.log(result.statusCode);
                    console.log(result.instanceDetails);
                    $scope.deletedSensors = result.instanceDetails;
                    $scope.deletedResultsDetails = false;
                })
                .error(function (error) {
                    console.log('error')
                });
        }


        $http({
            method : "POST",
            url : '/getSensorTypeCount',
            data : {
                "hubname" : $scope.hubname,
                "sensorType": $scope.sensorType,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.sensorTypeCount = data.count;
            }
        }).error(function(error) {

        });
    };


    $scope.listSensor = function () {
        $http({
            method : "POST",
            url : '/listsensors',
            data : {
                "hubname" : $scope.hubname,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hideSensorList = false;
                $scope.sensorlist = data.sensorlist;
            }
        }).error(function(error) {

        });
    };

    $scope.listsensorTypeRegion = function () {
        $http({
            method : "POST",
            url : '/listsensorTypeRegion',
            data : {
                "hubname" : $scope.hubname,
                "username" : $cookies.get('username'),
                "sensortype" : $scope.sensorType
            }
        }).success(function(data) {
            // checking the response data for statusCode
            console.log(JSON.stringify(data));
            if (data.statusCode == 200) {
                $scope.sensorRegions = data.sensorRegions;
            }
        }).error(function(error) {

        });
    };


    /*
     $scope.getSensorInstances = function () {
     console.log("HubName: "+ $scope.hubname + "username:" + $cookies.get('username') + "SensorType: "
     + $scope.sensortypename);
     $http({
     method : "POST",
     url : '/listSensorInstances',
     data : {
     "hubname" : $scope.hubname,
     "username" : $cookies.get('username'),
     "sensorType": $scope.sensortypename
     }
     }).success(function(data) {
     // checking the response data for statusCode
     if (data.statusCode == 200) {
     console.log("Data received:" + JSON.stringify(data));
     $scope.hideSensorHubName = false;
     $scope.hideSensorInstancesList = false;
     $scope.hideDate = false;
     $scope.sensorInstanceslist = data.sensorInstanceslist;
     }
     }).error(function(error) {
     });
     };*/

    $scope.startSensor = function(instanceId){
        console.log("Startign sensor" + instanceId);
        $http.post(
            host + 'api/v1/start',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="running";
                    $scope.selectedSensor.Status = 'running';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.stopSensor = function(instanceId){
        console.log("Stopping Sensor" + instanceId);
        $http.post(
            host + 'api/v1/stop',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="stopped";
                    $scope.selectedSensor.Status = 'stopped';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.terminateSensor = function(instanceId){
        console.log("Terminating Sensor" + instanceId);
        $http.post(
            host + 'api/v1/terminate',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="terminated";
                    $scope.selectedSensor.Status = 'terminated';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.getSensorData = function (sensorId) {
        $scope.hideErrMsg = true;
        $scope.hideData = true;
        $http.post(
            '/getSensorData',
            {
                sensorid: sensorId,
                startDate : $scope.sDate,
                endDate : $scope.eDate,
                username : $cookies.get('username')
            },
            { cors: true }
        )
            .success(function(data){
                if(data.statusCode == 200) {
                    $scope.unavailable = data.unavailable;
                    $scope.hideErrMsg = true;
                    $scope.hideData = false;
                    $scope.sensorData = data.sensorData;

                    if(data.unavailable){
                        $scope.hideErrMsg = false;
                        $scope.errMsg = "No Data Available for the date range selected!!   Please select a date range when the sensor was active";
                        $scope.hideData = true;
                    }
                }else if(data.statusCode == 400){
                    $scope.hideErrMsg = false;
                    $scope.errMsg = "Please select a date range!";
                    $scope.hideData = true;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };
}
]);
app.filter('dateToUTC', function() {
    return function(input) {
        return new Date(input).toUTCString();
    };
});