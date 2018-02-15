const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const patientobj = require('../model/patient');
/**
 * Constructor of the Repository
 */
function UserAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
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
  if(patient instanceof patientobj)
  {
   const collection = this.db.collection('Patients');
   collection.insertOne(patient, function(err, result)
   {
        console.log("Inserted Patient");
   });
  }
  else
  {
    console.log("Object is not a Patient type")
  }
};
/**
 * This function edits an existing patient document 
 * within the database
 * @param {*} username the patient object in the database that needs to
 * be edited 
 * @param {*} patient the edits to the patient object
 * 
 * @TODO test what happens if you put in a invalid username 
 */
UserAccess.prototype.Edit = function(username, patient)
{
  if(patient instanceof patientobj)
  {
    const collection = this.db.collection('Patients');
    collection.updateOne({'username' : username}, 
    { $set: {"firstname": patient.firstname,
              "lastname": patient.lastname,
              "diagnosis": patient.diagnosis,
              "username": patient.username,
              "password": patient.password,
              "securityQ1": patient.securityQ1,
              "securityA1": patient.securityA1,
              "securityQ2": patient.securityQ2,
              "securityA2": patient.securityA2,
              "securityQ3": patient.securityQ3,
              "securityA3": patient.securityA3,
              "medicalcode": patient.medicalcode}}, 
    function(err, result)
    {
     console.log("Updated Document");
    });
  }
  else
  {
    console.log("Object is not a Patient type")
  }
};
/** 
* This is the function to get all patient documents
* within the mongo database
*/
UserAccess.prototype.GetAll = function(){
  const collection = this.db.collection('Patients');
  return new promise(function(fullfill,reject)
  {
    collection.find({}).toArray(function(err, docs)
    {
      if(err)
      {
        console.log("Failed to get query");
        reject(err);
      }
      else
      {
        console.log("Successfully got query");
        fullfill(docs);
      }
    });
  });
};
/**
 * This is the function to get one patient documents
 * within the mongo database
 * @param {*} username the patient that is needed to be queried for information
 * returns a promise in order to ensure that the data is received before doing
 * any other operation
 */
UserAccess.prototype.GetOne = function(username)
{
  const collection = this.db.collection('Patients');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'username' : username}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log("Failed to get query");
        reject(err);
      }
      else
      {
        console.log("Successfully got query");
        fullfill(docs);
      }
    });
  });
};

module.exports = UserAccess;