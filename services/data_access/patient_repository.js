const mongoClient = require('mongodb').MongoClient;
const database = require('./db_connection.js');
/**
 * Constructor of the Repository
 */
function UserAccess(){
  //fetches the database client connection
  var db = new database();
}
/**
 * This function inserts a new patient into the 
 * mongodb database with received information
 * 
 * @param {*} patient is the patient object that 
 * is going to be inserted into the database 
 */
UserAccess.prototype.Create = function(patient)
{     
  const collection = db.collection('Patients');
  collection.insertOne(patient, function(err, result){
      console.log("Inserted Patient");
  });
};
/**
 * This function edits an existing patient document 
 * within the database
 * @param {*} username the patient object in the database that needs to
 * be edited 
 * @param {*} user the edits to the patient object
 * 
 * @TODO test what happens if you put in a invalid username 
 */
UserAccess.prototype.Edit = function(username, patient)
{
  collection.updateOne({'username' : username}, { $set: patient} , function(err, result){
    console.log("Updated Document");
  });
};
/**
 * This is the function to get all patient documents
 * within the mongo database
 * @param {*} callback a callback function used to notify
 * the caller when the database is done collecting all the 
 * data
 */
UserAccess.prototype.GetAll = function(callback){
  const collection = db.collection('Patients');
  collection.find({}).toArray(function(err, docs){
    callback(docs);
  });
};
/**
 * This is the function to get one patient documents
 * within the mongo database
 * @param {*} callback a callback function used to notify
 * the caller when the database is done collecting all the 
 * data
 */
UserAccess.prototype.GetOne = function(username,callback)
{
  const collection = db.collection('Patients');
  collection.find({username : username}).toArray(function(err, docs) {
    console.log(docs);
      callback(docs);
    });
};

module.exports = UserAccess;