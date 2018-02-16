var appointment = require('./appointment');

function MedicalProfessional (firstname, lastname , medicalcode, appointment) {
   this.firstname = firstname || '';
   this.lastname = lastname || '';
   this.medicalcode = medicalcode || '';
    // array to represent the appointments that the patient will have
    // as appointments are added, they will be pushed onto the array
   this.appointment = appointment || [];
   this.role = 'medical-professional';
}

MedicalProfessional.prototype.DisplayName = function ()  {
    return this.firstname +' '+ this.lastname;
};

module.exports = MedicalProfessional;