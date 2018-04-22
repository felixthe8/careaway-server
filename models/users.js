var security = require('./security');
var patient = require('./patient');
var mp = require('./medicalprofessional');
var admin = require('./systemadmin');
var identifier = require('./identifier');
const CryptoJS = require('crypto-js');

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
  this.identifier = identifier || {};
}

// creates a user object that both patient and medical professional need for registration
const createGenericUser = (Security, Salt, req) => {
  // grab all registration info from body
  const username = req.username;
  const password = req.password;
  const securityQ1 = req.securityQ1;
  const securityA1 = req.securityA1;
  const securityQ2 = req.securityQ2;
  const securityA2 = req.securityA2;
  const securityQ3 = req.securityQ3;
  const securityA3 = req.securityA3;

  // generate salts for password and security answers
  const saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
  const saltStrA1 = CryptoJS.lib.WordArray.random(128/8).toString();
  const saltStrA2 = CryptoJS.lib.WordArray.random(128/8).toString();
  const saltStrA3 = CryptoJS.lib.WordArray.random(128/8).toString();

  // create salt obj to hold all the salts
  var salt = new Salt(saltStrPass, saltStrA1, saltStrA2, saltStrA3);

  // hash password and answers with respective salts
  const passHashed = CryptoJS.HmacSHA256(password,salt.salt).toString();
  const a1Hashed = CryptoJS.HmacSHA256(securityA1,salt.saltA1).toString();
  const a2Hashed = CryptoJS.HmacSHA256(securityA2,salt.saltA2).toString();
  const a3Hashed = CryptoJS.HmacSHA256(securityA3,salt.saltA3).toString();

  // create array of security question objects
  var sQ = [
    new Security(securityQ1,a1Hashed),
    new Security(securityQ2,a2Hashed),
    new Security(securityQ3,a3Hashed)
  ]

  // create user object and return it
  return new User(username, passHashed, null, sQ, salt);
};
module.exports = {User, createGenericUser};
