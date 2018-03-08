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
/**
 * This appends a new appointment into the appointment 
 * attribute of the patient and medical professional
 * appointment list
 * 
 * @param {*} medicalprofessional the medical professional username 
 * @param {*} patient the patient username
 * @param {*} appointment the appointment object that will be appended to the user
 */
AppointmentAccess.prototype.CreateAppointment = function(medicalprofessional, patient, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : medicalprofessional},//looks for medical professional in the database
    { $push: {'accountType.appointment': appointment}},//inserts new appointment on the array 
    function(err, result){
      console.log('Added appointment');
    }
  );
  collection.updateOne(
    {'username' : patient},//looks for patient username in the database
    { $push: {'accountType.appointment': appointment}},//inserts new appointment on the array 
    function(err, result){
      console.log('Added appointment');
   }
  );
}

/**
 * This edit a new appointment into the appointment 
 * attribute of the patient and medical professional
 * appointment list
 * 
 * @param {*} medicalprofessional the medical professional username
 * @param {*} patient the patient username
 * @param {*} appointment the new update to the appointment
 */
AppointmentAccess.prototype.EditAppointment= function(medicalprofessional, patient, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : medicalprofessional, 'accountType.appointment.date' : appointment.date},//looks for username in the database
    { $set: {'accountType.appointment.$': appointment}},//updates appointment with new edits on the array 
    function(err, result){
      console.log('Edited appointment');
    }
  );
  collection.updateOne(
    {'username' : patient, 'accountType.appointment.date' : appointmentDate},//looks for username in the database
    { $set: {'accountType.appointment.$': appointment}},//updates appointment with new edits on the array 
      function(err, result){
      console.log('Edited appointment');
    }
  );
}
/**
 * This deletes a appointment into the appointment 
 * attribute of the patient and medical professional
 * appointment list
 * 
 * @param {*} medicalprofessional the medical professional username 
 * @param {*} patient the patient username
 * @param {*} appointment the appointment object that will be deleted
 */
AppointmentAccess.prototype.DeleteAppointment= function(medicalprofessional, patient, appointment){
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : medicalprofessional },//looks for username in the database
    { $pull: {'accountType.appointment': appointment}},//deletes the appointment
      function(err, result){
        console.log('Removed appointment');
    }
  );
  collection.updateOne({'username' : patient},//looks for username in the database
    { $pull: {'accountType.appointment.$': appointment}},//deletes the appointment
      function(err, result){
      console.log('Remove appointment');
  });
}

/**
 * This gets all appointments of a particular user in the system
 * @param {*} username the user identifier
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
        console.log('Successfully got query');
        if(result != null){        
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
}

AppointmentAccess.prototype.GetActive= function(username){
  const collection = this.db.collection('Users');
  return new promise(function(fullfill,reject)
  { 
    collection.find({'username' : username }).toArray(function(err, data)
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        console.log('Successfully got query');
        if(data != null){        
          const appointments = result.accountType.appointment;
          //return an object containing all the appointments of the user
          const appointmentList = {'appointments' : appointments};
          fullfill(appointmentList);
        }
        else{
          fullfill(null);
        }
      } 
    });
  });
}


module.exports = AppointmentAccess