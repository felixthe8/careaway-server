// DELETE THIS FILE AFTER RECEIVING THE ACTUAL MODELS
// This is the mock of the Patient Model for testing 

function Patient (fName, lName, username, password, SQ1, SQ2, SQ3, A1,A2,A3, medicalProCode,salt) {
	this.fName = fName || '';
	this.lName = lName || '';
	this.username = username || '';
	this.password = password || '';
    this.medicalProCode = medicalProCode || '';
    this.SQ1 = SQ1 || '';
	this.SQ2 = SQ2 || '';
    this.SQ3 = SQ3 || '';
    this.A1 = A1 || ''; 
    this.A2 = A2 || '';
    this.A3 = A3 || '';
    this.salt = salt || '';
}
//proper way of doing it
Patient.prototype.printName = function () {
    console.log("GET  CUCKED");
	return this.fName + " " +this.lName;
};

Patient.prototype.getUsername = function ()
{
    return this.username;
};

module.exports = Patient;