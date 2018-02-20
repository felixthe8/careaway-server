const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the User Repository
 */
function TreatmentPlanAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}

TreatmentPlanAccess.prototype.CreateTreatment = function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : patient},//looks for patient username in the database
    { $push: {'accountType.treatment': treatment}},//inserts new treatment on the array 
    function(err, result){
      console.log('Added treatment');
   }
  );
  console.log("Done");
}

TreatmentPlanAccess.prototype.EditTreatment= function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : patient, 'accountType.treatment.label' : treatment.label, 'accountType.treatment.create_at': treatment.create_at},//looks for username in the database
    { $set: {'accountType.treatment.$': treatment}},//updates treatment with new edits on the array 
      function(err, result){
      console.log('Edited treatment');
    }
  );
}

TreatmentPlanAccess.prototype.DeleteTreatment= function(patient,treatment){
  const collection = this.db.collection('Users');
  collection.updateOne({'username' : patient},//looks for username in the database
  { $pull: {'accountType.treatment': treatment}},//deletes the treatment
    function(err, result){
    console.log('Remove treatment');
  });
}

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
        if(result!=null){
          var treatments = result.accountType.treatment;
          //return an object containing all the treatments of the user
          var treatmentList = {'treatments' : treatments};
          fullfill(treatmentList);
        }
        else{
          fullfill(null);
        }
      } 
    });
  });
}

TreatmentPlanAccess.prototype.GetTreatmentsDiagnosis = function(MPCode,Diagnosis){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'accountType.role': 'patient', 'accountType.medicalcode': MPCode, 'accountType.diagnosis': Diagnosis}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log('Failed to get query');
          reject(err);
      }
      else
      {
        console.log('Successfully got query');
        var Treatments =[];
        for(var i=0; i<docs.length; i++)
        {
          Treatments.push(docs[i].accountType.treatment)
        }
        var results = {"Treatments" : Treatments}
        fullfill(results);
      }
    });
  });

}

module.exports = TreatmentPlanAccess