//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');

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
    var userSalt = new salt(CryptoJS.lib.WordArray.random(128/8))
    var sQ = [ new security("Where did you go?","Answer"),
               new security("Where did you go?","Answer"),
               new security("Where did you go?","Answer"),
    ]
    var role = new MedicalProfessional('Lazer','Man','MPCODE777')
    var newUser = new User('Lazer','Lazer',role,sQ,userSalt);
    //Saves the Value into0 the Database
    userAccessTool.ResetCredential('Lazer','Lazer7777');
    userAccessTool.FindPatient('MPCODE777').then(function(value){
        console.log(value);
        res.end("SUCCESS")
    })
    // userAccessTool.FindUser('Lazer').then(function(value){
    //     console.log(value)
    //     console.log("Role:"+value.accountType.role)
    //     if(value.accountType.role == "medical-professional"){
    //         console.log("HELLA YEA")
    //     }
    //     res.end("SUCCESS")
    // });
});

app.post('/FindUser', function(req,res) {
    var userAccessTool = new patientRepo(db);
    console.log("I'm inside the POST method");
    console.log("Username: "+req.body.username);
    console.log("Password: "+req.body.password);

    userAccessTool.GetOne(req.body.username).then (function(value) {
        
        res.send(value);

    })
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