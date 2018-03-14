const api = {};

// Creates an appointment.
api.create = (AppointmentRepo, DB) => (req, res)=> {
  DB.then(database => {
    // No overlapping appointments? 
    const repo = new AppointmentRepo(database);
    const requester = req.body.requester;
    const requestee = req.body.requestee;
    const appointment = req.body.appointment;
    // First check if this date/time is available for requester
    // If avail, check if available for requestee
    // If all avail, insert into repo
    repo.CreateAppointment(requester, requestee, appointment);
    // If success return, {success: true}
    // If error return, { success: false, reason: "A message on why creating it failed." }
  }).catch(err => {
    console.log("There was an error accessing the database.");
  });
}

// Modifies the appointment.
api.modify = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const appointment = req.body.appointment;
    const appointmentDate = req.body.appointmentDate;
    repo.EditAppointment(appointment.initiator, appointment.appointee, appointmentDate, appointment);
    res.json({"response" : "success"});
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