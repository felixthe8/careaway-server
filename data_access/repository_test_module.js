//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');
//This is all the models and dataaccess object
var Repo = require('./user_repository');
var AppointmentRepo = require('./appointment_repository');
var Appointments = require('../model/appointment');
var Treatments = require('../model/meter');
var TreatmentRepo = require('./treatment_plan_repository')
var User = require('../model/users');
var MedicalProfessional = require('../model/medicalprofessional');
var Patient = require('../model/patient');
var security = require('../model/security');
var salt = require('../model/identifier');
var mongodb = require('./db_connection.js');

var date = require('date-and-time'); 

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

app.post('/account/api/registration/medical-professional', function(req, res){
    //Creates the Repository for the users
    var userAccessTool = new Repo(db);
    var userSalt = new salt(CryptoJS.lib.WordArray.random(128/8).toString())
    var sQ = [ new security(req.body.securityQ1,req.body.securityA1),
               new security(req.body.securityQ2,req.body.securityA2),
               new security(req.body.securityQ3,req.body.securityA3),
    ]
    var role = new Patient(req.body.firstname,req.body.lastname,"MPCODE7777")
    var newUser = new User(req.body.username,CryptoJS.HmacSHA256(req.body.password,userSalt.salt).toString(),role,sQ,userSalt);
    userAccessTool.Create(newUser);
    res.send("SUCCESS");
});


//The test method to check repository functionality
app.get('/Treatment', function (req, res) {
    //Creates the Repository for the users
    var TreatmentAccess = new TreatmentRepo(db);
    var Treatment = new Treatments("HOW DO YOU DO?",10,"1/1/2010");

    TreatmentAccess.CreateTreatment("Lazer777",Treatment);
    //TreatmentAccess.EditTreatment("Lazer777",Treatment);
    //TreatmentAccess.DeleteTreatment("Lazer777",Treatment);
    // TreatmentAccess.GetPatientTreatment("Lazer777").then(function(value)
    // {
    //     console.log(value);
    //     res.end("SUCCESS");
    // });
    // TreatmentAccess.GetTreatmentsDiagnosis("MPCODE777","H").then(
    //     function(value){
    //         console.log(value);
    //         res.end("Success");
    //     }
    // )


});

//The test method to check repository functionality
app.get('/Appointment', function (req, res) {
    //Creates the Repository for the users
    var appointmentAccess = new AppointmentRepo(db);
    var appointment = new Appointments("Lazer","1/1/2010","Lazer777", "Accepted" );
    //appointmentAccess.CreateAppointment('Lazer','Lazer777',appointment);
    //appointmentAccess.EditAppointment('Lazer','Lazer777',"1/1/2010",appointment);
    //appointmentAccess.DeleteAppointment('Lazer','Lazer777',appointment);
    // appointmentAccess.GetAppointment('Lazer').then(function(value){
    //     console.log(value);
    //     res.end("Success");
    // });
});
 
//The test method to check repository functionality
app.get('/', function (req, res) {
    //Creates the Repository for the users
    var userAccessTool = new Repo(db);
    var userSalt = new salt(CryptoJS.lib.WordArray.random(128/8).toString())
    var sQ = [ new security(1,"Answer"),
               new security(4,"Answer"),
               new security(9,"Answer")
    ]
    var role = new Patient('Lazer','Man','MPCODE777')
    var newUser = new User.User('Lazer777',CryptoJS.HmacSHA256('Lazer',userSalt.salt).toString(),role,sQ,userSalt);
    //This saves a new Medical Professional into the database
    userAccessTool.Create(newUser);
    //The code below resets a passwrod with that username
    //userAccessTool.ResetCredential('Lazer777','Lazer7777',"FK");

    // This code finds any patient with that MPCODE777 (use data seed to check for functionality)
    // userAccessTool.FindPatient('MPCODE777').then(function(value){
    //     console.log(value);
    //     res.end(JSON.stringify(value));
    // })

    //This code finds all MPCODE within the database
    // userAccessTool.GetMedicalCodes().then(
    //     function(value){
    //         for(var i=0; i<value.codeList.length; i++)
    //         {
    //             console.log(value.codeList[i]);
    //         }
    //         res.end("SUCCESS");
    //     });

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