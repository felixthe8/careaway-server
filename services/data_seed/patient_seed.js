//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');
//This is all the models and dataaccess object
var Repo = require('../data_access/user_repository');
var User = require('../model/users');
var Patient = require('../model/patient');
var security = require('../model/security');
var salt = require('../model/identifier');
var mongodb = require('../data_access/db_connection.js');


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  //Create the database connection and make the connection
  var connection = new mongodb();
  connection.Connect().then(function(value){
    db=value;
    //Creates the Repository for the users
    var userAccessTool = new Repo(db);
    //generates a new patient 100 times
    for(var i=0; i<100; i++){
      var userSalt = new salt(CryptoJS.lib.WordArray.random(128/8).toString())
      var sQ = [ new security(1,"Answer"),
                 new security(4,"Answer"),
                 new security(9,"Answer"),
      ]
      var role = new Patient('Patient ', i ,'MPCODE777')
      var newUser = new User('Patient '+i,CryptoJS.HmacSHA256('Lazer',userSalt.salt).toString(),role,sQ,userSalt);
      //This saves a new Patient into the database
      userAccessTool.Create(newUser);
    }
    console.log("Done");
    db.close();
  });    
 });