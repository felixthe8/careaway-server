var mp = require('./medicalprofessional');
var patient = require('./patient');

/*
  Model for mail on the CareAway system.
*/

function Mail (receiver, message) {
  this.receiver = receiver || '';
  this.message = message || '';
}

module.exports = Mail;
