
"use strict"
  app.controller('logincontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
      var host = 'http://ec2-54-201-228-8.us-west-2.compute.amazonaws.com:5000/';
      /*var host = 'http://ec2-54-202-217-166.us-west-2.compute.amazonaws.com:5000/';*/
      $scope.hideMessage = true;

      $scope.signIn = function(){
      $http.post(
                host + 'api/v1/validate',
                  {
                      username: $scope.username,
                      password: $scope.password
                  },
                  { cors: true }
              )
              .success(function(data){
             if(data.statusCode == 200)
                 {    $scope.hideMessage = true;
                      $cookies.put('username',$scope.username);
                      $cookies.put('serverHost', host);
                      $state.go('profile',{'test':data.username});
                 } else if(data.statusCode == 202) {
                 $scope.hideMessage = false;
                 $scope.displayerrormessage = "Your account has been deactivated. Please contact Admin";
             }
             else {
                 $scope.hideMessage = false;
                 $scope.displayerrormessage = "Account does not exist. Please signup";
                  }
              })
              .error(function(error){
                    console.log('error')
              })
      }
  }]);
