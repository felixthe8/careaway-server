var user = require('./user');
var security = require('./security');

function Patient (firstname, lastname, diagnosis, username, password, securityQ1, securityA1, securityQ2, securityA2, securityQ3, securityA3) {
    this.firstname = firstname || '';
    this.lastname = lastname || '';
    this.diagnosis = diagnosis || '';
    this.username = user.username || '';
    this.password = user.password || '';
    this.securityQ1 = security.securityQ1 || '';
    this.securityA1 = security.securityA1 || '';
    this.securityQ2 = security.securityQ2 || '';
    this.securityA2 = security.securityA2 || '';
    this.securityQ3 = security.securityQ3 || '';
    this.securityA3 = security.securityA3 || '';
}
Patient.prototype = Object.create(user.prototype);

Patient.prototype.DisplayName = function () {
    return this.firstname+' '+this.lastname;
}

Patient.prototype.DisplayDiagnosis = function () {
    return this.diagnosis;
}

Patient.prototype.SetDiagnosis = function (i) {
    this.diagnosis = CONDITIONS[i];
}


var CONDITIONS = Object.freeze({
    1: "Diabetic",
    2: "Asthma",
    3: "High Blood Pressure",
    4: "Generalized Anxiety Disorder",
    5: "Panic Disorder",
    6: "Social Anxiety Disorder"
});
