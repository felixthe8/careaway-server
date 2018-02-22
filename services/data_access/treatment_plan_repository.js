const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the User Repository
 */
function TreatmentPlanAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
};
/**
 * This appends a new treatment plan to the patient 
 * treatment array
 * 
 * @param {*} patient the username of the patient 
 * @param {*} treatment the treatment plan that is going to be added
 */
TreatmentPlanAccess.prototype.CreateTreatment = function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : patient},//looks for patient username in the database
    { $push: {'accountType.treatment': treatment}},//inserts new treatment on the array 
    function(err, result){
      console.log('Added treatment');
    });
};
/**
 * This Edits an existing Treatment Plan
 * 
 * @param {*} patient the username of the patient
 * @param {*} treatment the new edits to the treatment plan
 */
TreatmentPlanAccess.prototype.EditTreatment= function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : patient, //looks for the patient in the database
     'accountType.treatment.label' : treatment.label, //looks for the type of treatment 
     'accountType.treatment.create_at': treatment.create_at}, //looks for the date created of that treatment
    { $set: {'accountType.treatment.$': treatment}},//updates treatment with new edits on the array 
      function(err, result){
      console.log('Edited treatment');
    }
  );
};
/**
 * This Deletes a Treatment Plan within the user's
 * treatment array
 * 
 * @param {*} patient the username of the patient 
 * @param {*} treatment the treatment plan that needs to be deleted
 */
TreatmentPlanAccess.prototype.DeleteTreatment= function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne({'username' : patient},//looks for username in the database
  { $pull: {'accountType.treatment': treatment}},//deletes the treatment
    function(err, result){
    console.log('Remove treatment');
  });
};
/**
 * Gets all treatment plans of a particular patient
 * 
 * @param {*} patient the username of the patient
 */
TreatmentPlanAccess.prototype.GetPatientTreatment = function(patient){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.findOne({'username' : patient },function(err, result)
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        console.log('Successfully got query');
        //Error check to see if the result is empty
        if(result!=null){
          var treatments = result.accountType.treatment;
          //return an object containing all the treatments of the user
          var treatmentList = {'treatments' : treatments};
          fullfill(treatmentList);
        }
        else{
          //return null if result is empty
          fullfill(null);
        }
      } 
    });
  });
};
/**
 * Gets Treatments plans of a particular diagnosis
 * under a particular medical professional
 * 
 * @param {*} MPCode the mediacl professional code
 * @param {*} Diagnosis the designated diagnosis
 */
TreatmentPlanAccess.prototype.GetTreatmentsDiagnosis = function(MPCode,Diagnosis){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'accountType.role': 'patient', 'accountType.medicalcode': MPCode, 'accountType.diagnosis': Diagnosis}).toArray(
    function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
          reject(err);
      }
      else
      {
        console.log('Successfully got query');
        //puts all treatment plans into one array
        var Treatments =[];
        for(var i=0; i<docs.length; i++)
        {
          Treatments.push(docs[i].accountType.treatment)
        }
        //returns the object of an array of treatment plan
        var results = {"Treatments" : Treatments}
        fullfill(results);
      }
    });
  });
};

module.exports = TreatmentPlanAccess