var mp = require('./medicalprofessional');
var patient = require('./patient');

/*
  Model for mail on the CareAway system.
*/

function Mail (sender, message) {
  this.sender = sender || '';
  this.message = message || '';
}

module.exports = Mail;
