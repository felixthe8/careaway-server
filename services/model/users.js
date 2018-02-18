var security = require('./security');
var patient = require('./patient');
var mp = require('./medicalprofessional');
var admin = require('./systemadmin');
var identifier = require('./identifier');
/*
    Model for user on the CareAway system. The User will be the top
    level of the object hierarchy. 
*/
function User (username, password, role, security, identifier) {
  this.username = username || '';
  this.password = password || '';
  // accountType refers to the role of the user in the system (ie. patient, medical professional
  // system admin). accountType will be stored as an object of either of the 3 mentioned types
  this.accountType = role || {};
  // security refers to the security questions and answers. The question and corresponding
  // answer will be stored as an element inside an array
  this.security = security || [];
  // identifier is an array that will hold the user salt value
  this.identifier = identifier || [];
}
module.exports = User;