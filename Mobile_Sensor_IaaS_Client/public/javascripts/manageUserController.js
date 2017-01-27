
"use strict"
app.controller('manageUserController',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    $scope.hidemessage = true;
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';
    $scope.getUserDetails = function () {
        $http.post(
            host + 'api/v1/getUserDetails',
            {
                'username' : $cookies.get('username')
            },
            { cors: true }
        ).success(function(data){
            $scope.hidemessage = true;
            var result = JSON.parse(JSON.stringify(data));
            console.log("Result: " + result.statusCode);
            if(result.statusCode == 200){
                $scope.userInfo = result.userInfo;
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

   $scope.manageUserStatus = function (userInfo) {
        $scope.selectedUser = userInfo;
        $scope.hidemessage = true;
    };

    $scope.activate = function (username) {
        $http.post(
            host + 'api/v1/activate',
            {
                'username' : username
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "User Account Activated successfully";
            } else {
                $scope.hidemessage = false;
                $scope.displaymessage = "User Account is already Active";
            }
        })
            .error(function(error){
                console.log('error')
            })

    };

    $scope.deactivate = function (username) {
        $http.post(
            host + 'api/v1/deactivate',
            {
                'username' : username
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "User Account Deactivated successfully";
            } else {
                $scope.hidemessage = false;
                $scope.displaymessage = "User Account is already Deactive";
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.delete = function (username) {
        $http.post(
            host + 'api/v1/deleteuser',
            {
                'username' : username
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "User Account deleted successfully";
            }
        })
            .error(function(error){
                console.log('error')
            })
    };


}])