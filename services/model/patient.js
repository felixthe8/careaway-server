var appointment = require('./appointment');
var meter = require('./meter');
var checklist = require('./checklist');    
/*
  Model for patients on the CareAway system. The Patient object will be 
  stored inside the User accountType attribute of the User. 
*/
function Patient (firstName, lastName, medicalcode, diagnosis, treatment,appointment) {
  this.firstName = firstName || '';
  this.lastName = lastName || '';
  // This refers to the medical professional's code the patient will provide during registration
  this.medicalcode = medicalcode || '';
  this.diagnosis = diagnosis || 'Undiagnosed';
  // This refers to an array to represent the appointments that the patient will have.
  // As appointments are added, they will be pushed into the array
  this.appointment = appointment || [];
  // This refers to an array to represent the treatment widgets the patient will be 
  // assigned. As treatment widgets are added, they will be pushed into the array
  this.treatment = treatment || [];
  this.role = 'patient';
}
// Function to return patient name
Patient.prototype.DisplayName = function () {
  return this.firstname+' '+this.lastname;
}
// Function to return the patient diagnosis
Patient.prototype.DisplayDiagnosis = function () {
  return this.diagnosis;
}
// Function to add a widget. Takes in 'widget' object as a parameter 
Patient.prototype.AddWidget = function (widget) {
  // Push 'widget' onto the array
  this.treatment.push(widget);
}
// Object to represent the patient conditions
var CONDITIONS = Object.freeze({
  1: "Diabetic",
  2: "Asthma",
  3: "High Blood Pressure",
  4: "Generalized Anxiety Disorder",
  5: "Panic Disorder",
  6: "Social Anxiety Disorder"
});
module.exports = Patient;