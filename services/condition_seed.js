//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');

var Repo = require('../data_access/treatment_plan_repository')
var mongodb = require('../data_access/db_connection.js');

var server = app.listen(8082 , function() {
  var host = server.address().address
  var port = server.address().port

  var connection = new mongodb();
  connection.Connect().then (function (value) {
    var conditions = ["Asthma", "Generalized Anxiety Disorder", "Diabetes", "High Blood Pressure", "Panic Disorder", "Social Anxiety Disorder" ]
    db = value
    var accessTool = new Repo(db)

    accessTool.writeDiagnosisList(conditions);

  })
})


