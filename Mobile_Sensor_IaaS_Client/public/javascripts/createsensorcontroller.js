
"use strict"
  app.controller('createsensorcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
      var host = $cookies.get('serverHost');
      //var host = 'http://localhost:5000/';

      $scope.addSensorToHub = function(){
    	  alert('Value ' + $scope.sensorname);

          $http.post(
                   host + 'api/v1/validate',
                  {
                      sensorname: $scope.sensorname
                  },
                  { cors: true }
              )
              .success(function(data){
            	  alert('Entered');
             if(data.statusCode == 200)
                  {
                      $state.go('createSensorHub');
                 }
                  else
                  {

                  }
              })
              .error(function(error){
                    console.log('error')
              })
      
      }
      $scope.cancel = function(){
    	  $state.go('createSensorHub');
      }
  }]);