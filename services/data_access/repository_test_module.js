//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');
//This is all the models and dataaccess object
var Repo = require('./user_repository');
var User = require('../model/users');
var MedicalProfessional = require('../model/medicalprofessional');
var security = require('../model/security');
var salt = require('../model/identifier');
var mongodb = require('./db_connection.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//The variable that holds the db connection
var db;

//The test method to check repository functionality
app.get('/', function (req, res) {
    //Creates the Repository for the users
    var userAccessTool = new Repo(db);
    var userSalt = new salt(CryptoJS.lib.WordArray.random(128/8).toString())
    var sQ = [ new security(1,"Answer"),
               new security(4,"Answer"),
               new security(9,"Answer"),
    ]
    var role = new MedicalProfessional('Lazer','Man','MPCODE777')
    var newUser = new User('Lazer',CryptoJS.HmacSHA256('Lazer',userSalt.salt).toString(),role,sQ,userSalt);
    //This saves a new Medical Professional into the database
    userAccessTool.Create(newUser);
    //The code below resets a passwrod with that username
    //userAccessTool.ResetCredential('Lazer','Lazer7777');

    //This code finds any patient with that MPCODE777 (use data seed to check for functionality)
    /*userAccessTool.FindPatient('MPCODE777').then(function(value){
        console.log(value);
        res.end("SUCCESS")
    })*/

    //This code checks the functionality to find one user
    /*userAccessTool.FindUser('Lazer').then(function(value){
        console.log(value)
        console.log("Role:"+value.accountType.role)
        if(value.accountType.role == "medical-professional"){
            console.log("HELLA YEA")
        }
        res.end("SUCCESS")
    });*/
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    //Create the database connection and make the connection
    var connection = new mongodb();
    connection.Connect().then(function(value){
        db=value;
    });    
 });