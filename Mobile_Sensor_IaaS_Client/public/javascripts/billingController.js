/**
 * Created by ChandanaRao on 12/3/16.
 */
"use strict"
app.controller('billingController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    $scope.hideIndividualBill = true;
    $scope.init = function(){
        $scope.getSensorHubList();
    };

    $scope.getSensorHubList = function(){
        $http({
            method : "POST",
            url : '/billing',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            if (data.statusCode == 200) {
                $scope.sensorHubList = data.sensorHubList;
                $scope.totalCost = data.totalCost;
                $scope.tax = data.tax;
            }
        }).error(function(error) {
        });
    };

    $scope.getSensorList =function(sensorHubName){
        $http({
            method : "POST",
            url : '/sensorBilling',
            data : {
                "username" : $cookies.get('username'),
                "sensorHubName" : sensorHubName
            }
        }).success(function(data) {
            if (data.statusCode == 200) {
                $scope.hideIndividualBill = false;
                $scope.sensorInstanceslist = data.sensorInstanceslist;
                $scope.Cost = data.totalCost;
                $scope.hub=sensorHubName;
            }
        }).error(function(error) {
        });
    };

}
]);