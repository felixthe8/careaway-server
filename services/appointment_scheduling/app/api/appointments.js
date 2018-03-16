const validator = require('./appointment-validation');
const api = {};
//TODO: appointment model
// Creates an appointment.
api.create = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => { 
    const repo = new AppointmentRepo(database);
    const appointment = req.body.appointment;
    const initiator = appointment.initiator;
    const appointee = appointment.appointee;
    // Construct appointment object.
    validator.validate_creation(repo, appointment, initiator, appointee).then(result => {
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
}

// Modifies the appointment.
api.modify = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const newAppointment = req.body.newAppointment;
    const originalAppointment = req.body.originalAppointment;
    const appointee = originalAppointment.appointee;
    const initiator = originalAppointment.initiator;

    validator.validate_modification(repo, initiator, appointee, originalAppointment, newAppointment).then(result => {
      if(result.success) {
        // No conflicting times, can successfully modify appointment.
        repo.EditAppointment(initiator, appointee, originalAppointment.startTime, newAppointment);
      }
      res.send({success: result.success, reason: result.reason});
    });
  }).catch(err => {
    console.log("There was an error accessing the database.");
    res.json({"response" : err});
  });
}

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

api.delete = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const appointment = req.body.appointment;
    console.log(appointment);
    repo.DeleteAppointment(appointment.initiator, appointment.appointee, appointment);
    res.json({"response" : "success"});
  }).catch(err => {
    console.log("There was an error accessing the database.");
    res.json({"response" : err});
  });

}

module.exports = api;