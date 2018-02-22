/*
  Model for appointments. Appointments will be stored inside
  appointment array of patient and medical professional. 
*/
function Appointment(appointee, date, initiator, status) {
  // The individual that the appointment will be scheduled with
  this.appointee = appointee;
  // The date refers to the date that the appointment is requested. 
  this.date = date;
  // The initiator will be the individual who requested the appointment
  this.initiator = initiator;
  // Status of the appointment (pending, accepting, declined)
  this.status = status;
}
module.exports = Appointment;