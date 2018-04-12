const moment = require('moment');

/**
 * Tests whether the date and times of two appointments overlap.
 * @param {*} firstAppointment The first appointment object.
 * @param {*} secondAppointment The second appointment object.
 * @return {*} True if the two appointments do overlap, false if they don't.
 */
const timesConflict = (firstAppointment, secondAppointment) => {
  // Construct moment objects for the existing appointment's times.
  const firstStartTime = moment(firstAppointment.startTime);
  const firstEndTime = moment(firstAppointment.endTime);
  // Construct moment objects for the new appointment's times.
  const secondStartTime = moment(secondAppointment.startTime);
  const secondEndTime = moment(secondAppointment.endTime);
  
  // The tests - if any are true, then the appointments overlap.

  // The end time of the new appointment is between an existing appointment's start and end time.
  const firstTest = (firstStartTime).isBefore(secondEndTime) && (firstEndTime).isAfter(secondEndTime);
  // The start of the new appointment is between an existing appointment's start and end time.
  const secondTest = (firstStartTime).isBefore(secondStartTime) && (firstEndTime).isAfter(secondStartTime);
  // The new appointment starts at the same time an existing one does.
  const thirdTest = (firstStartTime).isSame(secondStartTime);
  // The new appointment ends at the same time an existing one does.
  const fourthTest = (firstEndTime).isSame(secondEndTime);

  return firstTest || secondTest || thirdTest || fourthTest;
};

// Validates whether or not the appointment conflicts with existing appointments.
/**
 * Function for validating a new appointment being created.
 * @param {*} appointment The appointment object.
 * @param {*} appointmentList The appointment objects from the database.
 */
const validateCreate = (appointment, appointmentList) => {
  let valid = true;
  for(let i in appointmentList) {
    // Check if overlapping appointment times.
    if(timesConflict(appointmentList[i], appointment)) {
      // Invalid time.
      valid = false;
    }
  }
  return valid;
};

/**
 * Returns true if the appointment is a valid one.
 * @param {*} appointments The appointments (original and modified)
 * @param {*} appointmentList The list of appointments that exist in the database.
 */
const validateModification = (appointments, appointmentList) => {
  let valid = true;
  const newAppointment = appointments.modified;
  const original = appointments.original;
  for(let i in appointmentList) {
    const match = isSame(appointmentList[i], original);
    if(!match) {
      // Check if overlapping appointment times.
      if(timesConflict(appointmentList[i], newAppointment)) {
        // Invalid time.
        valid = false;
      }
    } 
  }
  return valid;
};

/**
 * Validates the appointment doesn't conflict with any other appointments and
 * is therefore a valid appointment.
 * @param {*} repo The appointment repository.
 * @param {*} appointment The appointment to be checked.
 * @param {*} initiator The initiator of the appointments.
 * @param {*} appointee The person this initiator is requesting an appointment with.
 * @param {*} validateFunction The function to validate if the appointment is valid.
 */
const validate = (repo, appointment, initiator, appointee, validateFunction) => {
  return new Promise((fulfill, reject) => {
    // Gets all initiator's appointments. 
    repo.GetAppointment(initiator).then(initiatorResult => {
      // Validates no conflicting appointment times for initiator.
      if(initiatorResult === null || validateFunction(appointment, initiatorResult.appointments)) {
        // Gets all appointee's appointments.
        repo.GetAppointment(appointee).then(appointeeResult => {
          // Validates no conflicting appointment times for appointee.
          if(appointeeResult === null || validateFunction(appointment, appointeeResult.appointments)) {
            // No conflicting times.
            fulfill({success: true, reason: ""});
          } else {
            // Conflicting appointments with the appointee.
            console.log("Error appointment time unavailable for appointee.");
            fulfill({success: false, reason: "Appointment time conflicts with the appointee's existing appointment."});
          }
        });
      } else {
        // Conflicting appointments with the initiator.
        console.log("Error appointment time unavailable for initiator.");
        fulfill({success: false, reason: "Appointment time conflicts with your existing appointment."});
      }
    }).catch(error => {
      console.log(error);
    });
  });
};

/**
 * Helper function for validating modified functions. Passes in the correct validating function.
 * @param {*} repo The appointment repo.
 * @param {*} appointments The appointments (original and modified).
 * @param {*} initiator The initiator of the appointment.
 * @param {*} appointee The person being requested of the appointment.
 */
const validate_modification = (repo, appointments, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    // Validates the appointment with the correct validation function.
    validate(repo, appointments, initiator, appointee, validateModification).then(result => {
      fulfill(result);
    });
  });
}

/**
 * Helper function for validating appointment creation. Passes in the correct validation function.
 * @param {*} repo The appointment repository.
 * @param {*} appointment The appointment object that was created.
 * @param {*} initiator The initiator of the appointment.
 * @param {*} appointee The person this appointment is requested.
 */
const validate_creation = (repo, appointment, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    validate(repo, appointment, initiator, appointee, validateCreate).then(result => {
      fulfill(result);
    });
  });
}

module.exports = {validate_creation, validate_modification};