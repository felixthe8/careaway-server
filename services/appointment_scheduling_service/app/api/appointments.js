const validator = require('./appointment-validation');
const api = {};

/**
 * Creates an appointment given by the requesting object if the
 * appointment time does not conflict with the existing appointment times
 * of the two parties. Sends a response back to the requestor detailing
 * whether or not the creation of the appointment was possible.
 * @param {*} Appointment The appointment object model.
 * @param {*} AppointmentRepo The functions to Create/Read/Update/Delete appointments in the database.
 * @param {*} DB The database connection object.
 * @param {*} req The requesting object.
 * @param {*} res The responding object.
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
    // An error occurred accessing the database.
    console.log(err);
    console.log("There was an error accessing the database.");
    res.send({success: false, reason: "Server error. Your request cannot be handled at this time."});
  });
};

/**
 * Modifies an existing appointment if the appointment does not conflict with either
 * party's existing appointment times. Sends a response back to the requestor
 * detailing whether or not this modification was successful.
 * @param {*} Appointment The appointment object model.
 * @param {*} AppointmentRepo The functions to Create/Read/Update/Delete appointments in the database.
 * @param {*} DB The database connection object.
 * @param {*} req The requesting object.
 * @param {*} res The response object.
 */
api.modify = (Appointment, AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);

    // Extract the modified and original appointment objects and construct them using the appointment model constructor.
    const newAppointment = Appointment.constructFromObject(req.body.newAppointment);
    const originalAppointment = Appointment.constructFromObject(req.body.originalAppointment);
    const appointments = {};
    appointments.modified = newAppointment;
    appointments.original = originalAppointment;
    // Extract the appointee and the initiator.
    const appointee = originalAppointment.appointee;
    const initiator = originalAppointment.initiator;

    // Validates the appointment doesn't conflict with any other appointment the initiator/appointee has.
    validator.validate_modification(repo, appointments, initiator, appointee)
      .then(result => {
        if(result.success) {
          // No conflicting times, can successfully modify appointment.
          repo.EditAppointment(initiator, appointee, originalAppointment.startTime, newAppointment);
        }
        res.json({success: result.success, reason: result.reason});
      });
  }).catch(err => {
    // An error occurred accessing the database.
    console.log("There was an error accessing the database.");
    res.json({success: false, response : "Server error. Your request cannot be handled at this time."});
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