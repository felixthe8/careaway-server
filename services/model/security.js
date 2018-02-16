/*
    Model for a security question + answer object. Each 
    Security object will be stored as an element in an
    array inside User 
*/
function Security (securityQ, securityA) {
  this.securityQ = securityQ || '';
  this.securityA = securityA || '';
}
module.exports = Security;