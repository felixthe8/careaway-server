const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the User Repository
 * @param {*} dbConnection the database connection string
 */
function AppointmentAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}
/**
 * This appends a new appointment into the appointment 
 * attribute of the appointee and initiator
 * appointment list
 * 
 * @param {*} initiator the initiator username 
 * @param {*} appointee the appointee username
 * @param {*} appointment the appointment object that will be appended to the user
 */
AppointmentAccess.prototype.CreateAppointment = function(initiator, appointee, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : initiator},//looks for initiator in the database
    { $push: {'accountType.appointment': appointment}},//inserts new appointment on the array 
    function(err, result){
      console.log('Added appointment');
    }
  );
  collection.updateOne(
    {'username' : appointee},//looks for appointee username in the database
    { $push: {'accountType.appointment': appointment}},//inserts new appointment on the array 
    function(err, result){
      console.log('Added appointment');
   }
  );
};

/**
 * This edit a new appointment into the appointment 
 * attribute of the appointee and initiator
 * appointment list
 * 
 * @param {*} initiator the initiator username
 * @param {*} appointee the appointee username
 * @param {*} startTime the old appointment startTime that needs to be changed
 * @param {*} appointment the new update to the appointment
 */
AppointmentAccess.prototype.EditAppointment= function(initiator, appointee, startTime, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : initiator, 'accountType.appointment.startTime' : startTime},//looks for username in the database
    { $set: {'accountType.appointment.$': appointment}},//updates appointment with new edits on the array 
    function(err, result){
      console.log('Edited appointment');
    }
  );
  collection.updateOne(
    {'username' : appointee, 'accountType.appointment.startTime' : startTime},//looks for username in the database
    { $set: {'accountType.appointment.$': appointment}},//updates appointment with new edits on the array 
      function(err, result){
      console.log('Edited appointment');
    }
  );
};
/**
 * This deletes a appointment into the appointment 
 * attribute of the appointee and initiator
 * appointment list
 * 
 * @param {*} initiator the initiator username 
 * @param {*} appointee the appointee username
 * @param {*} appointment the appointment object that will be deleted
 */
AppointmentAccess.prototype.DeleteAppointment= function(initiator, appointee, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : initiator },//looks for username in the database
    { $pull: {'accountType.appointment': appointment}},//deletes the appointment
      function(err, result){
        console.log('Remove appointment');
    }
  );
  collection.updateOne({'username' : appointee},//looks for username in the database
    { $pull: {'accountType.appointment': appointment}},//deletes the appointment
      function(err, result){
      console.log('Remove appointment');
  });
};

/**
 * This gets all appointments of a particular user in the system
 * @param {*} username the user identifier
 * @returns {*} a promise that returns a list of appointments of a user
 */
AppointmentAccess.prototype.GetAppointment= function(username){
  const collection = this.db.collection('Users');
  
  return new promise(function(fullfill,reject)
  { 
    collection.findOne({'username' : username },function(err, result)
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        if(result !== null){        
          var appointments = result.accountType.appointment;
          //return an object containing all the appointments of the user
          var appointmentList = {'appointments' : appointments};
          fullfill(appointmentList);
        }
        else{
          fullfill(null);
        }
      } 
    });
  });
};



module.exports = AppointmentAccess;