const moment = require('moment');

// Tests whether the date and times overlap
const checkTimes = (existing, newAppointment) => {
  existing.startTime = moment(existing.startTime);
  existing.endTime = moment(existing.endTime);
  newAppointment.startTime = moment(newAppointment.startTime);
  newAppointment.endTime = moment(newAppointment.endTime);

  //console.log(`existing ${existing.startTime} ${existing.endTime}\n newAppointment ${newAppointment.startTime} ${newAppointment.endTime}`);
  
  // The end time of the new appointment is between an existing appointment's start and end time.
  const firstTest = (existing.startTime).isBefore(newAppointment.endTime) && (existing.endTime).isAfter(newAppointment.endTime);
  // The start of the new appointment is between an existing appointment's start and end time.
  const secondTest = (existing.startTime).isBefore(newAppointment.startTime) && (existing.endTime).isAfter(newAppointment.startTime);
  // The new appointment starts at the same time an existing one does.
  const thirdTest = (existing.startTime).isSame(newAppointment.startTime);
  // The new appointment ends at the same time an existing one does.
  const fourthTest = (existing.endTime).isSame(newAppointment.endTime);
  return firstTest || secondTest || thirdTest || fourthTest;
};

// Validates whether or not the appointment conflicts with existing appointments.
const creation_validate = (appointment, appointmentList) => {
  let valid = true;
  for(let i in appointmentList) {
    // Check if overlapping appointment times.
    if(checkTimes(appointmentList[i], appointment)) {
      // Invalid time.
      valid = false;
    }
  }
  return valid;
};
const isSame = (first, second) => {
  const firstStart = moment(first.startTime);
  const secondStart = moment(second.startTime);

  const timesMatch = (firstStart).isSame(secondStart);
  const initiatorsMatch = first.initiator === second.initiator;
  const appointeesMatch = first.appointee === second.appointee;
  return timesMatch && initiatorsMatch && appointeesMatch;
};
const validateModdedAppointment = (original, newAppointment, appointmentList) => {
  let valid = true;
  for(let i in appointmentList) {
    const match = isSame(appointmentList[i], original);
    if(!match) {
      // Check if overlapping appointment times.
      if(checkTimes(appointmentList[i], newAppointment)) {
        // Invalid time.
        valid = false;
      }
    } 
  }
  return valid;
};
/**
 * Used to validate whether the appointment conflicts with both party's
 * existing appointments.
 * @param {*} repo The appointment repository.
 * @param {*} appointment The appointment object.
 * @param {*} initiator The username of the one who initiated this appointment.
 * @param {*} appointee The username of the person the intiator is requesting this appointment with.
 * @returns {*} a promise that returns if an appointment was created successfully
 */
const validate_creation = (repo, appointment, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    // Gets all initiator's appointments. 
    repo.GetAppointment(initiator).then(initiatorResult => {
      // Validates no conflicting appointment times for initiator.
      if(initiatorResult === null || creation_validate(appointment, initiatorResult.appointments)) {
        // Gets all appointee's appointments.
        repo.GetAppointment(appointee).then(appointeeResult => {
          // Validates no conflicting appointment times for appointee.
          if(appointeeResult === null || creation_validate(appointment, appointeeResult.appointments)) {
            // No conflicting times.
            fulfill({success: true, reason: ""});
          } else {
            console.log("Error appointment time unavailable for appointee.");
            fulfill({success: false, reason: "Appointment time conflicts with the appointee's existing appointment."});
          }
        });
      } else {
        console.log("Error appointment time unavailable for initiator.");
        fulfill({success: false, reason: "Appointment time conflicts with your existing appointment."});
      }
    }).catch(error => {
      console.log(error);
    });
  });
};

const validate_modification = (repo, initiator, appointee, originalAppointment, newAppointment) => {
  return new Promise((fulfill, reject) => {
    repo.GetAppointment(initiator).then(initiatorResult => {
      //console.log(initiatorResult);
      // Validates no conflicting appointment times for initiator.
      if( validateModdedAppointment(originalAppointment, newAppointment, initiatorResult.appointments)) {
        // Gets all appointee's appointments.
        repo.GetAppointment(appointee).then(appointeeResult => {
          // Validates no conflicting appointment times for appointee.
          if( validateModdedAppointment(originalAppointment, newAppointment, appointeeResult.appointments)) {
            // No conflicting times.
            fulfill({success: true, reason: ""});
          } else {
            console.log("Error appointment time unavailable for appointee.");
            fulfill({success: false, reason: "Appointment time conflicts with the appointee's existing appointment."});
          }
        });
      } else {
        console.log("Error appointment time unavailable for initiator.");
        fulfill({success: false, reason: "Appointment time conflicts with your existing appointment."});
      }
    }).catch(error => {
      console.log(error);
    });
  });
  
};
module.exports = {validate_creation, validate_modification};