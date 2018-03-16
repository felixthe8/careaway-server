/*
  Model for appointments. Appointments will be stored inside
  appointment array of patient and medical professional. 
*/
function Appointment(appointee, appointeeName, date, startTime, endTime, initiator, initiatorName, status) {
  // The individual that the appointment will be scheduled with
  this.appointee = appointee;
  // The name of the appointee.
  this.appointeeName = appointeeName;
  // The date refers to the date that the appointment is requested. 
  this.date = date;
  // The start time of the appointment.
  this.startTime = startTime;
  // The end time of the appointment.
  this.endTime = endTime;
  // The initiator will be the individual who requested the appointment
  this.initiator = initiator;
  // The name of the Initiator
  this.initiatorName = initiatorName;
  // Status of the appointment (pending, accepting, declined)
  this.status = status;
}
/*
  Overloaded constructor for appointments.
  @param {*} appointment the appointment object.
*/
function Appointment(appointment) {
  
}
module.exports = Appointment;