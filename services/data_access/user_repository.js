const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the User Repository
 */
function UserAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}
/**
 * This function inserts a new User into the 
 * mongodb database with received information
 * 
 * @param {*} user contains the user info that is going
 * to be inserted into the database
 */
UserAccess.prototype.Create = function(user)
{ 
  const collection = this.db.collection('Users');
  collection.insertOne(user, function(err, result)
  {
    if(err == null){
      console.log('Inserted User');
    }
    else{
      console.log(err);
    }
  });
};
/**
 * This function adds the accountType from a new user from SSO
 * @param {*} username the unique identifier of the new user
 * @param {*} accountType either medical professional or patient type
 */
UserAccess.prototype.addAccountType= function(username,accountType){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : username},//looks for username in the database
    { $set: {'accountType': accountType}},//inserts new password 
    function(err, result){
      console.log('Updated Account Type');
    }
  );
}
/**
 * This function edits the patient diagnosis
 * @param {*} username 
 * @param {*} diagnosis
 */
UserAccess.prototype.EditPatientDiagnosis= function(username,diagnosis){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : username},//looks for username in the database
    { $set: {'accountType.diagnosis ': diagnosis}},//inserts new password 
    function(err, result){
      console.log('Updated Diagnosis');
    }
  );
}
/**
 * This function edits a user's password into the 
 * mongodb database with received information
 * 
 * @param {*} username the user that wants to reset their password
 * @param {*} password the new password the user wants to save
 */
UserAccess.prototype.ResetCredential = function(username,password,salt){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : username},//looks for username in the database
    { $set: {'password':password,'identifier.salt': salt}},//inserts new password 
    function(err, result){
      console.log('Updated Password');
    }
  );
};
/**
 * This function finds an existing user in the database
 * it will return the user info as an object if found or 
 * return an empty object if the user does not exist 
 * 
 * @param {*} username the user that is being queried for
 */
UserAccess.prototype.FindUser= function(username)
{
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'username' : username}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
          reject(err);
      }
      else
      {
        console.log('Successfully got query');
        var results = {"User" : docs}
        fullfill(results);
      }
    });
  });
};

/**
 * This function finds an existing user in the database
 * it will return the user info as an object if found or 
 * return an empty object if the user does not exist 
 * 
 * @param {*} username the user that is being queried for
 */
UserAccess.prototype.FindUserId= function(id)
{
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'_id' : id}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
          reject(err);
      }
      else
      {
        console.log('Successfully got query');
        console.log(docs);
        var results = {"User" : docs}
        fullfill(results);
      }
    });
  });
};
UserAccess.prototype.FindMP = function(mpcode)
{
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.findOne({'accountType.medicalcode' : mpcode, 'accountType.role' : "medical-professional"}, (err, result) => 
    {
      if(err)
      {
        console.log('Failed to get query');
          reject(err);
      }
      else
      {
        console.log('Successfully got query');
        fullfill(result);
      }
    });
  });
};
/**
 * This finds all the patient under a medical professional
 * 
 * @param {*} MPCode the medical professional querying for their patient
 */
UserAccess.prototype.FindPatient = function(MPCode){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    //This is the filter to locate any user with the role of patient and contains the MPCode of the medical professional
    collection.find({'accountType.medicalcode': MPCode, 'accountType.role': 'patient'}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        console.log('Successfully got query');
        //return the array of patients in a object 
        var patients = {'patients' : docs};
        fullfill(patients);
      } 
    });
  });
};
/** 
 * This function is used to gather a list of medical professional codes 
 * used to verify if a medical professional exist within our system
*/
UserAccess.prototype.GetMedicalCodes = function(){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    //This is the filter to locate any user with the role  medical professional
    collection.find({'accountType.role': 'medical-professional'}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        console.log('Successfully got query');
        //grabs just the Medical Professional Code and save it to an array
        var mpCode = []
        for(var i=0; i<docs.length; i++){
          mpCode.push(docs[i].accountType.medicalcode);
        }
        //return the array of codes 
        var code = {'codeList' : mpCode};
        fullfill(code);
      } 
    });
  });

}
module.exports = UserAccess;