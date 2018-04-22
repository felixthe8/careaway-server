//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var Repo = require('../../../data_access/feedback_repository.js')
var mongodb = require('../../../data_access/db_connection.js');


var connection = new mongodb();
connection.Connect().then (function (value) {
  db = value
  var accessTool = new Repo(db)
  accessTool.writeFeedbackCollection();

})


