const validator = require('./appointment-validation');
const api = {};
/**
 * Creates an appointment.
 * @param {*} Appointment this is the model of the appointments object
 * @param {*} AppointmentRepo this contains the data_access functions to Create/Read/Update/Delete appointments
 * @param {*} DB this is the database connection object
 * @returns {*} a success message or an error message back to the requestor
 */
api.create = (Appointment, AppointmentRepo, DB) => (req, res) => {
  DB.then(database => { 
    const repo = new AppointmentRepo(database);
    // Construct appointment object.
    const appointment = Appointment.constructFromObject(req.body.appointment);
    const initiator = appointment.initiator;
    const appointee = appointment.appointee;
    // Validates the appointment doesn't conflict with any other appointments the initator/appointee has.
    validator.validate_creation(repo, appointment, initiator, appointee)
      .then(result => {
        if(result.success) {
          // No conflicting times, insert into the database.
          repo.CreateAppointment(initiator, appointee, appointment);
        }
        res.send({success: result.success, reason: result.reason});
    });
  }).catch(err => {
    console.log(err);
    console.log("There was an error accessing the database.");
  });
};
/**
 * Modifies the appointment.
 * @param {*} Appointment this is the model of the appointments object
 * @param {*} AppointmentRepo this contains the data_access functions to Create/Read/Update/Delete appointments
 * @param {*} DB this is the database connection object
 * @returns {*} a success message or an error message back to the requestor
 */
api.modify = (Appointment,AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const newAppointment = Appointment.constructFromObject(req.body.newAppointment);
    const originalAppointment = Appointment.constructFromObject(req.body.originalAppointment);
    const appointee = originalAppointment.appointee;
    const initiator = originalAppointment.initiator;
    // Validates the appointment doesn't conflict with any other appointment the initiator/appointee has.
    validator.validate_modification(repo, initiator, appointee, originalAppointment, newAppointment)
      .then(result => {
        if(result.success) {
          // No conflicting times, can successfully modify appointment.
          repo.EditAppointment(initiator, appointee, originalAppointment.startTime, newAppointment);
        }
        res.send({success: result.success, reason: result.reason});
      });
  }).catch(err => {
    console.log("There was an error accessing the database.");
    res.json({success: false, response : err});
  });
}
/**
 * Retreives the appointment of a particular user and returns it to the requestor
 * @param {*} AppointmentRepo this contains the data_access functions to Create/Read/Update/Delete appointments
 * @param {*} DB this is the database connection object
 * @returns {*} A JSON object of the appointments
 */
api.get = (AppointmentRepo, DB) => (req, res) => {
  const username = req.query.username;
  DB.then(database => {
    var repo = new AppointmentRepo(database);
    // Gets all active appointments for this user.
    repo.GetAppointment(username).then(result => {
      // Returns a json object appointments containing an array of appointments
      res.json(result);
    });
  });
}
/**
 * Deletes the appointment
 * @param {*} Appointment the appointment model
 * @param {*} AppointmentRepo this contains the data_access functions to Create/Read/Update/Delete appointments
 * @param {*} DB this is the database connection object
 * @returns {*} A JSON object of the appointments
 */
api.delete = (Appointment, AppointmentRepo, DB) => (req, res) => {
  
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const appointment = Appointment.constructFromObject(req.body.appointment);
    console.log(appointment);
    // Sends a request to delete the appointment in th data store
    repo.DeleteAppointment(appointment.initiator, appointment.appointee, appointment);
    // Return success response
    res.json({success: "success"});
  }).catch(err => {
    // Return a error is something went wrong
    console.log("There was an error accessing the database.");
    res.json({"response" : err});
  });

}

module.exports = api;