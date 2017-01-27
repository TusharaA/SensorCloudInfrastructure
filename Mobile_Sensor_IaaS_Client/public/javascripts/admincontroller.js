
"use strict"
app.controller('admincontroller',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    var host = 'http://ec2-54-201-228-8.us-west-2.compute.amazonaws.com:5000/';
    //var host = 'http://localhost:5000/';

    $scope.adminValidate = function(){
        $http.post(
                host + 'api/v1/adminValidate',
                {
                    username:$scope.username,
                    password:$scope.password
                },
                { cors:true}
            )
            .success(function(data){

                if(data.statusCode == 200)
                {
                    $cookies.put('username',$scope.username);
                    $cookies.put('serverHost',host);
                    $cookies.put('isadmin','admin');
                    $state.go('adminprofile',{'test':data.username});
                }
                else
                {
                    
                }

            })
            .error(function(data){
                console.log('error');
            })
    }
}]);
