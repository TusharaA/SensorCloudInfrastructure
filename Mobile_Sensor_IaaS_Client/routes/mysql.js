var ejs = require('ejs');//importing module ejs
var mysql = require('mysql');//importing module mysql
var setup = require('./setup');
var poolConfig = setup.dbpoolsize;
var pool = [];
var db = setup.db;
var envs = require('envs');

function getConnection() {
    var connection = mysql.createConnection({
        host: envs('dbhost'), //host where mysql server is running
        user: envs('dbuser'), //user for the mysql application
        password: envs('dbpassword'), //password for the mysql application
        database: envs('dbdatabase'), //database name
        port: 3306 //port, it is 3306 by default for mysql
    });
    return connection;
}

//create connection pool
exports.createConnectionPool = function createConnectionPool() {
    console.log("Entered create conn pool" + poolConfig.maxsize);
    for (var i = 0; i < poolConfig.maxsize; i++) {
        pool.push(getConnection());
    }

};

function getConnectionFromPool() {
    if (pool.length <= 0) {
        console.log("No more connections");
        return null;
    }
    else {
        return pool.pop();

    }

}
//end connection pool


//fetching the data from the sql server
function fetchData(callback, sqlQuery) {
    console.log("\nSQL Query::" + sqlQuery);

    var connection = getConnectionFromPool();
    connection.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
            pool.push(connection);
        }
        else { // return err or result
            console.log("DB Results:" + rows);
            pool.push(connection);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
}

//retrieve data
function insertData(tableName, insertValues, callback) {

    //var connection=getConnection();
    var connection = getConnectionFromPool();
    var query1 = 'INSERT INTO ' + tableName + ' SET ?';

    connection.query(query1, insertValues, function (err, result) {
        if (err) {
            console.log("ERROR: " + err.message);
            pool.push(connection);
        }
        else { // return err or result
            pool.push(connection);
            callback(err, result);
        }
    });
    console.log("\nConnection closed..");
}

//update data
function updateData(tableName, insertValues, primaryKeys, callback) {
    var connection = getConnectionFromPool();
    connection.query('UPDATE ' + tableName + ' SET ? WHERE ?', [insertValues, primaryKeys], function (err, result) {
        if (err) {
            console.log("ERROR: " + err.message);
            pool.push(connection);
        }
        else { // return err or result
            pool.push(connection);
            callback(err, result);
        }
    });
    console.log("\nConnection closed..");
}

exports.updateData = updateData;
exports.insertData = insertData;
exports.fetchData = fetchData;