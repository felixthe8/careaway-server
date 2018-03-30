const moment = require('moment');
// TODO: Rename these functions
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
 * @param {*} original 
 * @param {*} newAppointment 
 * @param {*} appointmentList 
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

/**
 * Helper function for validation. Passes in the correct validating function.
 * Appointment modification.
 * @param {*} repo 
 * @param {*} appointments 
 * @param {*} initiator 
 * @param {*} appointee 
 */
const validate_modification = (repo, appointments, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    validate(repo, appointments, initiator, appointee, validateModification).then(result => {
      fulfill(result);
    });
  });
}

/**
 * Helper function for validation. Passes in the correct validation function.
 * Create appointment.
 * @param {*} repo 
 * @param {*} appointment 
 * @param {*} initiator 
 * @param {*} appointee 
 */
const validate_creation = (repo, appointment, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    validate(repo, appointment, initiator, appointee, validateCreate).then(result => {
      fulfill(result);
    });
  });
}

module.exports = {validate_creation, validate_modification};