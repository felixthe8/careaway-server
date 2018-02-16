var appointment = require('./appointment');
var meter = require('./meter');
var checklist = require('./checklist');    

function Patient (firstname, lastname, medicalcode, diagnosis, treatment,appointment) {
    this.firstname = firstname || '';
    this.lastname = lastname || '';
    this.medicalcode = medicalcode || '';
    this.diagnosis = diagnosis || '';
    // array to represent the appointments that the patient will have
    // as appointments are added, they will be pushed onto the array
    this.appointment = appointment || [];
    this.treatment = treatment || [];
    this.role = 'patient';
}

Patient.prototype.DisplayName = function () {
    return this.firstname+' '+this.lastname;
}

Patient.prototype.DisplayDiagnosis = function () {
    return this.diagnosis;
}

Patient.prototype.AddWidget = function (widget) {
    this.treatment.push(widget);
}

var CONDITIONS = Object.freeze({
    1: "Diabetic",
    2: "Asthma",
    3: "High Blood Pressure",
    4: "Generalized Anxiety Disorder",
    5: "Panic Disorder",
    6: "Social Anxiety Disorder"
});

module.exports = Patient;