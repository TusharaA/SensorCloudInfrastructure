
"use strict"
  app.controller('adminprofilecontroller',['$scope','$http','$state','$cookies', '$interval',function ($scope, $http, $state, $cookies, $interval){
      var host = $cookies.get('serverHost');
    if($cookies.get('username') ==undefined || $cookies.get('username') =='' || $cookies.get('username') == null){
        //$state.go('admin')



    }
    else
    {

        $scope.test = $state.params.test;
        $scope.user = $cookies.get('username');

        $scope.logout = function(){
            $cookies.remove('username');
            $state.go('login')
        }

        //first call

        $scope.initiate_admin_dashborad=function () {
            $scope.total_users();
            $scope.sensors_count()
            $scope.cluster_count();
            $scope.pending_sensorcount();
            $scope.active_sensorcount();
            $scope.terminated_sensorcount();
            $scope.sensor_typecount();
            $scope.sensors_per_cluster();
            $scope.total_revenue();
        }


        var updatedashboard = function() {
            console.log('Changing exampleText');
            $scope.total_users();
            $scope.sensors_count()
            $scope.cluster_count();
            $scope.pending_sensorcount();
            $scope.active_sensorcount();
            $scope.terminated_sensorcount();
            $scope.sensor_typecount();
            $scope.sensors_per_cluster();
            $scope.total_revenue();
        };
        

        $interval(updatedashboard,15*1000);
        
        $scope.total_users = function(){
            $http.get(host+'api/v1/totalusers')
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.users = data.users;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error');
                })
        }

        $scope.sensors_count = function(){
            $http.get(
                host + 'api/v1/totalsensors'

            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.sensors = data.sensors;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })
        }

        $scope.cluster_count = function(){
            $http.get(
                    host+ 'api/v1/totalclusters'

                )
                    .success(function(data){
                        if(data.statusCode == 200)
                        {
                            $scope.clusters = data.clusters;
                        }
                        else
                        {
                        }
                    })
                    .error(function(error){
                        console.log('error')
                    })
        }


        $scope.active_sensorcount = function () {

            $http.get(
                host+ 'api/v1/activesensors'
            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.activesensors = data.activesensors;
                        $scope.activesensorlist = data.result;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })

        }

        $scope.pending_sensorcount = function () {

            $http.get(
                host+ 'api/v1/stoppedsensors'
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.stoppedsensorscount = data.stoppedsensors;
                        $scope.stoppedsensorlist = data.result;

                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.terminated_sensorcount = function () {

            $http.get(
                host+ 'api/v1/terminatedsensors'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.terminatedsensorscount = data.terminatedsensors;
                        $scope.terminatedsensorlist = data.result;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.sensor_typecount = function () {
            $http.get(
                host+ 'api/v1/typecount'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.sensorcount = data.count;
                        $scope.sensortypes = data.types;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.sensors_per_cluster = function(){
            $http.get(
                host+ 'api/v1/sensorspercluster'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.clustercount = data.count;
                        $scope.clusternames = data.clusters;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.total_revenue  = function(){
            $http.get(
                '/getTotalRevenue'
            ).success(function(data){
                if(data.statusCode == 200)
                {
                    $scope.totalRevenue = data.totalRevenue;
                }
                else
                {
                }
            })
                .error(function(error){
                    console.log('error')
                })
        }

    }
      
  }])
