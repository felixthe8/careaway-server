var mp = require('./medicalprofessional');
var patient = require('./patient');

/*
  Model for mail on the CareAway system.
*/

function Mail (mp, patient, message) {
  this.mp = mp || '';
  this.patient = patient || '';
  this.message = message || '';
}

// creates a mail object
const createMail = (mp, patient, message) => {
  const mp = req.mp;
  const patient = req.patient;
  const message = req.message;

  return new Mail(mp, patient, message);
};

module.exports = {Mail, createMail};
