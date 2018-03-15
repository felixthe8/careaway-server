const moment = require('moment');
const api = {};

// Tests whether the date and times overlap
const checkTimes = (existing, newAppt) => {
  existing.startTime = moment(existing.startTime);
  existing.endTime = moment(existing.endTime);
  newAppt.startTime = moment(newAppt.startTime);
  newAppt.endTime = moment(newAppt.endTime);
  console.log(`existing ${existing.startTime} ${existing.endTime}\n newAppt ${newAppt.startTime} ${newAppt.endTime}`);
  // The end time of the new appointment is between an existing appointment's start and end time.
  const firstTest = (existing.startTime).isBefore(newAppt.endTime) && (existing.endTime).isAfter(newAppt.endTime);
  // The start of the new appointment is between an existing appointment's start and end time.
  const secondTest = (existing.startTime).isBefore(newAppt.startTime) && (existing.endTime).isAfter(newAppt.startTime);
  // The new appointment starts at the same time an existing one does.
  const thirdTest = (existing.startTime).isSame(newAppt.startTime);
  // The new appointment ends at the same time an existing one does.
  const fourthTest = (existing.endTime).isSame(newAppt.endTime);
  return firstTest || secondTest || thirdTest || fourthTest;
}
const validate = (appointment, appointmentList) => {
  let valid = true;
  //console.log(appointmentList);
  for(let i in appointmentList) {
    // Check if overlapping appointment times.
    if(checkTimes(appointmentList[i], appointment)){
      // Invalid time.
      valid = false;
    }
  }
  return valid;
}
// Creates an appointment.
api.create = (AppointmentRepo, DB) => (req, res) => {
  DB.then(database => {
    // No overlapping appointments? 
    const repo = new AppointmentRepo(database);
    const appointment = req.body.appointment;
    const initiator = appointment.initiator;
    const appointee = appointment.appointee;

    appointment.startTime = moment(appointment.startTime);
    appointment.endTime = moment(appointment.endTime);

    // Gets all initiator's appointments.
    repo.GetAppointment(initiator).then(initiatorResult => {
      //console.log(initiatorResult);
      // Validates no conflicting appointment times for initiator.
      if(validate(appointment, initiatorResult.appointments)) {
        // Gets all appointee's appointments.
        repo.GetAppointment(appointee).then(appointeeResult => {
          //console.log("Here");
          // Validates no conflicting appointment times for appointee.
          if(validate(appointment, appointeeResult.appointments)) {
            // No conflicting times, insert into the database.
            repo.CreateAppointment(initiator, appointee, appointment);
            res.send({success: true});
          } else {
            console.log("Error appointment time unavailable for appointee.");
            res.send({success: false, reason: "Appointment time conflicts with appointee's appointments."});
          }
        });
      } else {
        console.log("Error appointment time unavailable for initiator.");
        res.send({success: false, reason: "Appointment time conflicts with initiator's appointments."});
      }
    }).catch(error => {
      console.log(error);
    });

    // First check if this date/time is available for requester
    // If avail, check if available for requestee
    // If all avail, insert into repo
    
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