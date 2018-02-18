const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const userModel = require('../model/users.js')
const patientObject= require('../model/patient.js');
const professionalObject = require('../model/medicalprofessional.js')
const sysAdminObject = require('../model/systemadmin.js')
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
 * @param {*} user is the patient object that 
 * is going to be inserted into the database 
 */
UserAccess.prototype.Create = function(user)
{     
  const collection = this.db.collection('Users');
  collection.insertOne(user, function(err, result)
  {
    console.log("Inserted Patient");
  });
};

UserAccess.prototype.ResetCredential = function(username,password){
    const collection = this.db.collection('Users');
    collection.updateOne({'username' : username}, 
    { $set: {"password":password}}, 
    function(err, result)
    {
     console.log("Updated Document");
    });
}

UserAccess.prototype.FindUser= function(username)
{
  const collection = this.db.collection('Users');
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
        fullfill(docs[0]);
      }
    });
  });
}

UserAccess.prototype.FindPatient = function(MPCode){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    console.log(MPCode)
    collection.find({'accountType': {"medicalcode": MPCode}}).toArray(function(err, docs) 
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
}
module.exports = UserAccess;