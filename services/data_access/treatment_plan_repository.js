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

TreatmentPlanAccess.prototype.CreateTreatment = function(){
}

TreatmentPlanAccess.prototype.EditTreatment= function(){

}

TreatmentPlanAccess.prototype.DeleteTreatment= function(){

}

TreatmentPlanAccess.prototype.GetPatientTreatment= function(){

}

TreatmentPlanAccess.prototype.GetTreatmentsDiagnosis = function(){
    

}

module.exports = TreatmentPlanAccess