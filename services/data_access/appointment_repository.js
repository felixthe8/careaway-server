const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the User Repository
 */
function AppointmentAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}

AppointmentAccess.prototype.CreateAppointment = function(){

}

AppointmentAccess.prototype.EditAppointment= function(){

}

AppointmentAccess.prototype.DeleteAppointment= function(){

}

AppointmentAccess.prototype.GetPatientAppointment= function(){

}



module.exports = AppointmentAccess