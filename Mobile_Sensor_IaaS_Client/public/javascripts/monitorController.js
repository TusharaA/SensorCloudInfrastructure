"use strict"
app.controller('monitorController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';

    $scope.hideSensorManager = true;
    $scope.hideMonitoringDetails = true;
    $scope.hideGraph = true;
    $scope.hideErrormessage = true;
    $scope.hideGraphDetails = true;
    $scope.hideData =true;

    $scope.hideClusterMonitor = true;

    $scope.getUserSensorDetailsMonitor = function () {
        $http.post(
            host + 'api/v1/getSensorDetailsMonitor',
            {
                'username' : $cookies.get('username')
            },
            { cors: true }
        )
            .success(function(data){

                var result = JSON.parse(JSON.stringify(data));
                if(result.statusCode == 200) {
                    console.log(result.sensorInfo)
                    $scope.sensorlist = result.sensorInfo;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.getUserSensorDetailsMonitorCluster = function () {
        $http.post(
            host + 'api/v1/getSensorDetailsMonitorCluster',
            {
                'username' : $cookies.get('username')
            },
            { cors: true }
        )
            .success(function(data){

                var result = JSON.parse(JSON.stringify(data));
                if(result.statusCode == 200) {
                    console.log(result.clusterInfo)
                    $scope.sensorlist = result.clusterInfo;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.monitorCluster = function (sensorHubName) {
        $http.post(
            host + 'api/v1/getClusterSensorDetails',
            {
                'username' : $cookies.get('username'),
                'sensorhubname' : sensorHubName
            },
            { cors: true }
        )
            .success(function(data){

                var result = JSON.parse(JSON.stringify(data));
                if(result.statusCode == 200) {
                    $scope.hideClusterMonitor = false;
                    $scope.clusterInfo = result.clusterInfo;
                    var res = result.clusterInfo;
                    $scope.data = [];
                    $scope.labels = [];
                    $scope.series = [];
                    for(var i = 0; i < res.length; i++) {
                        var obj = res[i];
                        console.log('Entered' + obj.ActiveHours + obj.SensorId);
                        $scope.data.push(obj.ActiveHours);
                        $scope.labels.push(obj.SensorId);
                    }
                    $scope.colours = ["#C24642","#369EAD"];
                    $scope.series = ['Active Hours'];
                }
            })
            .error(function(error){
                console.log('error')
            })

    };


    $scope.monitorSensor = function (sensorInfo) {
        $scope.selectedSensor = sensorInfo;
        $scope.hideMonitoringDetails = true;
        $scope.hideErrormessage = true;
        $scope.hideGraphDetails = true;
    };

    $scope.monSensor = function(sensorId){
        $http.post(
            host + 'api/v1/getMonitoringInfo',
            {
                sensorid: sensorId,
                startDate : $scope.startDate
            },
            { cors: true }
        )
            .success(function(data){

                var result = JSON.parse(JSON.stringify(data));
                console.log(result.launchtime);
                if(result.statusCode == 200) {
                    $scope.hideMonitoringDetails = false;
                    $scope.hideErrormessage = true;
                    $scope.hideGraph = false;
                    $scope.hideGraphDetails = true;
                    $scope.sensorid = result.sensorid;
                    console.log(result.cpuutilisationAverage);
                    $scope.status = result.state;
                    $scope.cpuUtilizationAvg = result.cpuutilisationAverage;
                    $scope.networkInMet = result.networkInAverage;
                    $scope.networkOutMet = result.networkoutAverage;

                    $scope.labels = ["Utilized", "Empty"];
                    $scope.data = [100 * result.cpuutilisationAverage, 100 - (100 * result.cpuutilisationAverage)];

                    $scope.labelsNetIn = ["Utilized", "Empty"];
                    $scope.dataNetIn = [result.networkInAverage / 9000, 100 - (result.networkInAverage / 9000)];

                    $scope.labelsNetOut = ["Utilized", "Empty"];
                    $scope.dataNetOut = [result.networkoutAverage / 200, 100 - (result.networkoutAverage / 200)];

                    $scope.colours = ["#26B99A",
                        "#34495E"];
                } else if(result.statusCode == 201) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;

                    //var tzoffset = (result.launchtime).getTimezoneOffset() * 60000; //offset in milliseconds
                    //var localISOTime = (new Date(result.launchtime - tzoffset)).toISOString().slice(0,16);
                    //alert(localISOTime);
                    //new Date().toISOString().slice(0,16);//"2015-04-12T11:42";

                    $scope.displayerrormessage = "Sensor was launched on " + result.launchtime + " GMT. Please select date and time after launch date.";

                } else if(result.statusCode == 202) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;
                    $scope.displayerrormessage = "Please select date and time before current date and time.";

                } else if(result.statusCode == 203) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = true;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = false;

                    $scope.sensorid = result.sensorid;
                    $scope.status = result.state;
                    $scope.messgae = "Sensor is " + result.state.Name + ". Please select a Sensor in running status.";
                } else if(result.statusCode == 205) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;
                    $scope.displayerrormessage = "No data available for this date and time. Please check after some time.";
                }

            })
            .error(function(error){
                console.log('error')
            })
    };
}
]);
