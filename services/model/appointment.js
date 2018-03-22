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
/*
  A function that takes in an appointment object, destructs it to
  get the necessary fields for the appointment object we described, 
  and creates an appointment object that matches the appointment
  objects in our database.
  @param {*} appointment the appointment object.
*/
const constructFromObject = (appointment) => {
  // Extract the information needed for the appointment object.
  const appointee = appointment.appointee;
  const appointeeName = appointment.appointeeName;
  const date = appointment.date;
  const startTime = appointment.startTime;
  const endTime = appointment.endTime;
  const initiator = appointment.initiator;
  const initiatorName = appointment.initiatorName;
  const status = appointment.status;

  // Construct the appointment object and return it.
  return new Appointment(date, startTime, endTime, appointee, appointeeName, initiator, initiatorName, status);
}
module.exports = {Appointment, constructFromObject};