const api = {};

// Creates an appointment.
api.create = (AppointmentRepo, DB) => (req, res)=> {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const medicalProfessional = req.body.med;
    const patient = req.body.patient;
    const appointment = req.body.appointment;

    repo.CreateAppointment(medicalProfessional, patient, appointment);
  }).catch(err => {
    console.log("There was an error accessing the database.");
  });
}

// Modifies the appointment.
api.modify = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    const medicalProfessional = req.body.med;
    const patient = req.body.patient;
    const appointment = req.body.appointment;

    repo.EditAppointment(medicalProfessional, patient, appointment);
  }).catch(err => {
    console.log("There was an error accessing the database.");
  });
}

api.get = (AppointmentRepo, DB) => (req, res) => {
  const username = req.query.username;
  DB.then(database => {
    const repo = new AppointmentRepo(database);
    // Gets all active appointments for this user.
    repo.GetActive(username).then(result => {
      // Returns a json object appointments containing an array of appointments
      res.json(result);
    });
  });
}

api.updateStatus = (AppointmentRepo, DB) => (req, res) => {
  console.log(req.body.appointment);
  console.log("HELLA");
  res.json({SUCCESS:"SUCCESS"});
}
module.exports = api;