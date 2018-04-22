//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');

var Repo = require('../../../data_access/treatment_plan_repository')
var mongodb = require('../../../data_access/db_connection.js');

var conditions = require('./conditions');

  var connection = new mongodb();
  connection.Connect().then (function (value) {
    var supportedDiagnoses = conditions.list;
    db = value
    var accessTool = new Repo(db)

    accessTool.writeDiagnosisCollection(supportedDiagnoses);

  })



