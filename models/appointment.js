/*
  Model for appointments. Appointments will be stored inside
  appointment array of patient and medical professional. 
*/
function Appointment(date, startTime, endTime, appointee, appointeeName, initiator, initiatorName, status) {
  // The date refers to the date that the appointment is requested. 
  this.date = date;
  // The start time of the appointment.
  this.startTime = startTime;
  // The end time of the appointment.
  this.endTime = endTime;
  // The individual that the appointment will be scheduled with.
  this.appointee = appointee;
  // The name of the appointee.
  this.appointeeName = appointeeName;
  // The initiator will be the individual who requested the appointment.
  this.initiator = initiator;
  // The name of the person who requested the appointment.
  this.initiatorName = initiatorName;
  // Status of the appointment (pending, accepting, declined).
  this.status = status;
}

/**
 * A function that takes in an appointment object, destructs it to
 * get the necessary fields for the appointment object we described, 
 * and creates an appointment object that matches the appointment
 * @param {*} appointment An object that represents an appointment.
 * @return {*} An appointment object.
 */
const constructFromObject = (appointment) => {
  // Extract the information needed for the appointment object.
  // The username of the person getting an appointment requeset.
  const appointee = appointment.appointee; 
  // The full name of the person getting an appointment request.
  const appointeeName = appointment.appointeeName;
  // The date of the appointment.
  const date = appointment.date;
  // The start time of the appointment.
  const startTime = appointment.startTime;
  // The end time of the appointment.
  const endTime = appointment.endTime;
  // The person who initiated this appointment.
  const initiator = appointment.initiator;
  // The full name of the person who initiated this request.
  const initiatorName = appointment.initiatorName;
  // The current status of this appointment.
  const status = appointment.status;

  // Construct the appointment object and return it.
  return new Appointment(date, startTime, endTime, appointee, appointeeName, initiator, initiatorName, status);
}

module.exports = {Appointment, constructFromObject};