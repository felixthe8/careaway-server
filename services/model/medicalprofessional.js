var appointment = require('./appointment');
/*
    Model for medical professionals on the CareAway system. The Medical Professional 
    object will be stored inside the User accountType attribute of the User
*/
function MedicalProfessional (firstName, lastName , medicalcode, appointment) {
  this.firstName = firstName || '';
  this.lastName = lastName || '';
  this.medicalcode = medicalcode || '';
  // array to represent the appointments that the medical professional
  // will have as appointments are added, they will be pushed onto the array
  this.appointment = appointment || [];
  this.role = 'medical-professional';
}
// Function to display the medical professional name
MedicalProfessional.prototype.DisplayName = function ()  {
    return this.firstname +' '+ this.lastname;
};
module.exports = MedicalProfessional;