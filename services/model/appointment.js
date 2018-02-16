function Appointment(appointee, date, initiator, status) {
    this.appointee = appointee;
    // the date refers to the date that the appointment is requested. 
    this.date = date;
    // the initiator will be the individual who requested the appointment
    this.initiator = initiator;
    // status of the appointment (pending, accepting, declined)
    this.status = status;
}

module.exports = Appointment;