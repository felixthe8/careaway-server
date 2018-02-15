//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');

var Repo = require('./medical_professional_repository');
//TODO: Change this directory to the actual Model Folder
var mP = require('../model/medicalprofessional');
var mongodb = require('./db_connection.js');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//The variable that holds the db connection
var db;
//The test method to check all patientrepository function
app.get('/', function (req, res) {
    var salt = CryptoJS.lib.WordArray.random(128/8);

    //Creates the Repository for the Medical Professional
    var userAccessTool = new Repo(db);
    //Make a new Medical Professional Object
    var newMP = new mP(
        'req.body.firstName',
        'req.body.lastName',
        'MPCODE',
        'req.body.username',
        'CryptoJS.PBKDF2(req.body.password,salt, { keySize: 128/32, iterations: 1000 }).toString()',
        'req.body.securityQ1',
        'req.body.securityQ2',
        'req.body.securityQ3',
        'CryptoJS.SHA256(req.body.answer1).toString(CryptoJS.enc.Hex)',
        'CryptoJS.SHA256(req.body.answer2).toString(CryptoJS.enc.Hex)',
        'CryptoJS.SHA256(req.body.answer3).toString(CryptoJS.enc.Hex)'
       );
    //Saves the Value into the Database

    userAccessTool.Edit("afdasfasfafaf",newMP);
    res.end("SUCCESS")
});
//Setting up the port
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