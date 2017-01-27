var ejs= require("ejs");
var mysql = require('./mysql');

exports.listuserSensorDetails = function (req, res) {
    var username = req.body.username;
    var userSensorsInfo = "select * from sensor where UserName = '" + username + "' and Status != 'terminated';";
    var sensorlist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorlist = results;
            }
            var json_response={"statusCode":200,"sensorlist":sensorlist};
            res.send(json_response);
        }
    }, userSensorsInfo);
};

exports.listsensorhub = function(req, res){
    var username = req.body.username;
    var getHubName = "select distinct SensorHubName from sensor where UserName = '" + username + "' and Status != 'terminated';";
    var hubnamelist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                hubnamelist = results;
            }
            console.log("Entered here :" + JSON.stringify(hubnamelist));
            var json_response={"statusCode":200,"hubnamelist":hubnamelist};
            res.send(json_response);
        }
    }, getHubName);
};

exports.getSensorTypeCount = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var sensorType = req.body.sensorType;
    var getSensorCount = "select *  from sensor where UserName = '" + username + "' and SensorHubName = '" + sensorhubname + "' and SensorType= '"+ sensorType + "' and Status != 'terminated';";
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {

            console.log(results);
            var json_response={"statusCode":200,"count": results.length};
            res.send(json_response);
        }
    }, getSensorCount);
};

exports.listsensors = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var getSensorList = "select distinct SensorType from sensor where UserName = '" + username + "' and SensorHubName = '" + sensorhubname + "' and Status != 'terminated';";
    var sensorlist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorlist = results;
            }
            var json_response={"statusCode":200,"sensorlist":sensorlist};
            res.send(json_response);
        }
    }, getSensorList);
};


exports.listsensorTypeRegion = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var sensorType = req.body.sensortype;
    var getSensorList = "select distinct(Region) from sensor where UserName = '" + username + "' and SensorHubName = '" + sensorhubname + "' " +
        "and SensorType ='" + sensorType + "'and Status != 'terminated';";
    var sensorlist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorTypeRegions = results;
            }
            var json_response={"statusCode":200,"sensorRegions":sensorTypeRegions};
            res.send(json_response);
        }
    }, getSensorList);
};

exports.listSensorsInstances = function(req, res){

    var username = req.body.username;
    var sensorType = req.body.sensorType;
    var hubname = req.body.hubname;
    var getSensorInstancesList = "select * from usersensorhubdetails where username = '" + username + "' and SensorHubName = '" + hubname + "' and SensorType = '"
        + sensorType + "';";
    console.log(getSensorInstancesList);
    var sensorInstanceslist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorInstanceslist = results;
            }
            var json_response={"statusCode":200,"sensorInstanceslist":sensorInstanceslist};
            res.send(json_response);
        }
    }, getSensorInstancesList);
};

exports.getSensorData = function(req,res){
    var username = req.body.username;
    var sensorId = req.body.sensorid;
    var sDate = new Date(req.body.startDate);
    var eDate = new Date(req.body.endDate);
    var getSensorData ="";
    var endDate;
    var startDate;

    if(req.body.startDate == null || req.body.endDate == null){
        getSensorData = "select * from sensordata where sensorId = '" + sensorId + "';";
    }else{
        var endDate = eDate.getFullYear()+"-"+(eDate.getMonth()+1)+"-"+eDate.getDate();
        var startDate = sDate.getFullYear()+"-"+(sDate.getMonth()+1)+"-"+sDate.getDate();
        getSensorData = "select * from sensordata where sensorId = '" + sensorId + "' and CAST(TimeStamp as Date) BETWEEN '"+startDate+"' and '"+endDate+"';";
    }
    var sensorData = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                sensorData = results;
                var json_response={"statusCode":200,"sensorData":sensorData, "unavailable":false};
                res.send(json_response);
            }else{
                console.log("No Data available for this date range");
                var json_response={"statusCode":200,"sensorData":sensorData,"unavailable":true};
                res.send(json_response);
            }

        }
    }, getSensorData);
};

exports.getAllSensorHubBilling = function(req,res){
    var username = req.body.username;
    var getSensorHubList = "Select A.id, A.SensorHubName, SUM(A.Charges) AS 'ChargesPerSensorCluster' from (SELECT SC.id, S.SensorHubName, CASE WHEN S.StopTime IS NOT NULL THEN SUM(SD.ChargePerHour*S.ActiveHours) WHEN S.StopTime IS NULL THEN SUM(SD.ChargePerHour*S.ActiveHours) + SUM(SD.ChargePerHour* timestampdiff(SECOND,S.StartTime,now())/3600.0) END AS 'Charges' FROM sensor S JOIN sensordetails SD ON SD.SensorType = S.SensorType JOIN sensorcluster SC ON SC.SensorHubName = S.SensorHubName WHERE SC.UserName = '"+username+"' GROUP BY S.SensorHubName, SC.id, S.StopTime) A GROUP BY A.id, A.SensorHubName;";
    var total=0;
    console.log(getSensorHubList);
    var sensorHubList = [];
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else  {
            if (results.length > 0) {
                for(var i=0;i<results.length;i++){
                    var sensorHub={}
                    sensorHub.id = results[i].id;
                    sensorHub.SensorHubName = results[i].SensorHubName;
                    sensorHub.cost = results[i].ChargesPerSensorCluster;
                    sensorHubList.push(sensorHub);
                    total = total +parseFloat(results[i].ChargesPerSensorCluster);
                    tax = total * 0.15;
                }
                console.log("total:::"+total+"Tax-------"+tax)
                var json_response={"statusCode":200,"sensorHubList":sensorHubList,"totalCost":total, "tax":tax};
                res.send(json_response);

            }else{
                console.log("came-----------------------");
            }
        }
    }, getSensorHubList);
};

exports.getIndividualSensorHubBilling = function(req, res){

    var username = req.body.username;
    var hubname = req.body.sensorHubName;
    var getSensorInstancesList = "select A.sensorId, CASE WHEN A.StopTime IS NOT NULL THEN A.ActiveHours WHEN A.StopTime IS NULL THEN A.ActiveHours + timestampdiff(SECOND,A.StartTime,now())/3600.0 END AS 'Active_Hours', B.ChargePerHour,CASE WHEN A.StopTime IS NOT NULL THEN B.ChargePerHour*A.ActiveHours WHEN A.StopTime IS NULL THEN (B.ChargePerHour*A.ActiveHours) + B.ChargePerHour*(timestampdiff(SECOND,A.StartTime,now())/3600.0) END AS 'Charges' from sensor A join sensordetails B where A.SensorType = B.SensorType and A.SensorHubName = '"+hubname+"' and A.UserName='"+username+"';";
    var total=0;
    console.log(getSensorInstancesList);
    var sensorInstanceslist = [];
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else  {
            if (results.length > 0) {
                for(var i=0;i<results.length;i++){
                    var sensorHub={}
                    sensorHub.sensorId = results[i].sensorId;
                    sensorHub.usage = results[i].Active_Hours;
                    sensorHub.chargesPerHour = results[i].ChargePerHour;
                    sensorHub.cost = results[i].Charges;
                    sensorInstanceslist.push(sensorHub);
                    total = total +parseFloat(results[i].Charges);

                }
                var json_response={"statusCode":200,"sensorInstanceslist":sensorInstanceslist,"totalCost":total};
                res.send(json_response);

            }else{
                console.log("came-----------------------");
            }
        }
    }, getSensorInstancesList);
};

exports.getTotalRevenue = function(req, res){
    var getTotalRevenue = "SELECT SUM(SD.ChargePerHour*S.ActiveHours) AS Charges FROM sensor S JOIN sensordetails SD ON SD.SensorType = S.SensorType;";
    console.log(getTotalRevenue);
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;

        } else  {
            if (results.length > 0) {
                console.log("revenue::"+results[0].Charges);
                var json_response={"statusCode":200,"totalRevenue":results[0].Charges};
                res.send(json_response);

            }else{
                console.log("came-----------------------");
            }
        }
    }, getTotalRevenue);
};
