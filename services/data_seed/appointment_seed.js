//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
//This is all the models and dataaccess object
var mongodb = require('../data_access/db_connection.js');
var Repo = require('../data_access/appointment_repository');
var Appointment = require('../model/appointment');

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
  //Create the database connection and make the connection
  var connection = new mongodb();
  connection.Connect().then(function(value){
    db=value;
    //Creates the Repository for the users
    var apptAccessTool = new Repo(db);
    // This represents the month
    for(var i=4; i<5; i++){
      // This represents the day of the month
      for(var j=1; j<28; j++){
        var date = `2018-0${i}-${j<10? "0"+j : j}`;
        var startTime = new Date(`2018-0${i}-${j<10? "0"+j : j}T12:00:00Z`);
        var endTime = new Date(`2018-0${i}-${j<10? "0"+j : j}T12:30:00Z`);
        // CHANGE THESE VALUES IF YOU HAVE DIFFERENT USERNAME IN YOUR LOCAL DATABASE
        var appointee = "C@reawayP24";
        var appointeeName = 'Tom Nook';
        var initiator = "C@reawayM24";
        var initiatorName = 'Jim Raynor';
        var status = "Pending";
        const appointmentObject = new Appointment.Appointment(date, startTime, endTime, appointee, appointeeName, initiator, initiatorName, status);
        apptAccessTool.CreateAppointment(initiator,appointee,appointmentObject);
      }    
      console.log("Done");
    }

    db.close();
  });    
 });