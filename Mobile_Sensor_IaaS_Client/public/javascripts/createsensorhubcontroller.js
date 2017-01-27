
"use strict"
  app.controller('createsensorhubcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
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

      $scope.getSensorTypeDetails = function(){
          $http.get(
              host + 'api/v1/getAvailableSensorTypesDetails',
              { cors: true }
          ).success(function(data){
                  var result = JSON.parse(JSON.stringify(data));
                  console.log(result.statusCode);
                  $scope.sensors = result.instanceDetails;
                  $scope.resultsDetails = false;
              if(data.statusCode == 200){
                  for (var i = 0; i < data.instanceDetails.length; i++) {
                      var addsensor = {id:"", type:"", region:"", count:""};
                      addsensor['id'] = data.instanceDetails[i].index;
                      addsensor['type'] = data.instanceDetails[i].SensorType;
                      addsensor['region'] = data.instanceDetails[i].Region;
                      addsensor['count'] = 0;
                      addsensor['dropdownInfo'] = addsensor.type + "-in-" + addsensor.region;
                      sensors.push(addsensor);
                  }

                  $scope.sensorList = sensors;
              }
              })
              .error(function(error){
                  console.log('error')
              });
      }
      
  }]);


