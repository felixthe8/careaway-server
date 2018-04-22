//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');

var Repo = require('../data_access/treatment_plan_repository')
var mongodb = require('../data_access/db_connection.js');

var server = app.listen(8081 , function() {
  var host = server.address().address
  var port = server.address().port

  var connection = new mongodb();
  connection.Connect().then (function (value) {
    db = value
    var accessTool = new Repo(db)

    /* Call to treatment repo to create the conditions in the database  */

  })
})


