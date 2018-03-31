var CryptoJS = require('crypto-js');
var randomstring = require('randomstring');
const api = {};

// const string to return and compare to
const USER_EXISTS = 'Username already exists.';
// TODO: Remove this function
// creates a user object that both patient and medical professional need for registration
function createGenericUser(User, Security, Salt, req) {
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
   return new User(username,passHashed,null,sQ,salt);
};

api.register = (passport) => (req, res, next) => {
  passport.authenticate('local-registration', (err, success, message) => {
    if(success) {
      req.login(message.user, (err) => {
        if(err) {
          console.log("Error authenticating user " + err);
          res.json(message);
          res.end();
        } else {
          console.log("Authenticated user");
          message.cookie = req.session.passport.user;
          res.json(message);
          res.end();
        }
      });
    } else {
      console.log("Not successful registration");
      console.log(message);
      res.json(message);
      res.end();
    }
  })(req, res, next);
}
//TODO: Change the use of createGenericUser function to User.createGenericUser from User model
//This method inputs the patient type for a newly registered SSO user
api.ssoRegisterPatient = (User,Security, Salt, Patient, UserRepo, DB) => (req, res) => {
  // grab username and account info
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const medicalCode = req.body.medicalCode;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.GetMedicalCodes().then(function(value){
      //check if medical pro exist in the db already
      var codes = value.codeList;
      if(codes.indexOf(medicalCode) === -1){
        res.json({success:false , error : "Non-Existant MP CODE"});
      } else{
        userRepo.FindUser(username).then(
          function(value){
            var newUser = createGenericUser(User, Security, Salt, req.body);
            var accountType = new Patient(firstName,lastName,medicalCode);
            var security = newUser.security;
            var identifier = newUser.identifier;
            identifier.salt = value.User[0].identifier.salt;
            console.log(identifier);
            // update db with new account type
            userRepo.addAccountType(username,accountType,security,identifier);
            res.json({success: true});
          });
      }
    })
  });
}
//This method inputs the medical professional type for a newly registered SSO user
api.ssoRegisterMed = (User, Security, Salt,MedicalProfessional, UserRepo, DB) => (req, res) => {
  // grab username and account info
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.GetMedicalCodes().then(function(value){
      //check if medical pro exist in the db already
      var medicalCode ='';
      var codes = value.codeList;
      //generates a new mp code
      do{
        medicalCode = 'MP'+randomstring.generate({
        length: 7,
        capitalization: 'uppercase'});
      }while(codes.indexOf(medicalCode) != -1);

      userRepo.FindUser(username).then(
        function(value){
          var newUser = createGenericUser(User, Security, Salt, req.body);
          var accountType = new MedicalProfessional(firstName,lastName,medicalCode);
          var security = newUser.security;
          var identifier = newUser.identifier;
          identifier.salt = value.User[0].identifier.salt;
          console.log(identifier);
          // update db with new hashed account type
          userRepo.addAccountType(username,accountType,security,identifier);
          res.json({success: true});
        });
    });
  });

}

module.exports = api;