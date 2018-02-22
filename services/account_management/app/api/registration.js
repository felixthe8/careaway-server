var CryptoJS = require('crypto-js');
var randomstring = require('randomstring');
const api = {};

// const string to return and compare to
const USER_EXISTS = 'Username already exists.';

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


api.registerPatient = (User, Security, Salt, Patient, UserRepo, DB) => (req, res) => {
   // grab just username from body
  const username = req.body.username;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
        if (queriedUser.length > 0) {
          // username already exists
          return USER_EXISTS;
        } else {
          // username doesn't exist yet, query medical codes
          return userRepo.GetMedicalCodes();
        }
    }).then(function(value) {
      if (value === USER_EXISTS) {
        // user exists, respond with json and do nothing else
        res.json({error: USER_EXISTS});
      } else {
        // get list of med pro codes
        var codes = value.codeList;
        const medicalCode = req.body.medicalCode;
      if (codes.indexOf(medicalCode) === -1) {
        // med pro code from request was not found in db
        res.json({error: 'Medical professional code does not exist.'});
      } else {
      // med pro code was found in db
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        // create user object with patient role
        var newUser = createGenericUser(User, Security, Salt, req.body);
        var role = new Patient(firstName, lastName, medicalCode);
        newUser.accountType = role;
        // put user in db
        userRepo.Create(newUser);
        res.json({success: true});
       }
      }
    });
  });   
};

api.registerMedpro = (User, Security, Salt, MedicalProfessional, UserRepo, DB) => (req, res) => {
  // grab just username from body
  const username = req.body.username;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length > 0) {
        // username already exists
        return USER_EXISTS;
      } else {
        // username doesn't exist yet, query medical codes
        return userRepo.GetMedicalCodes();
      }
    }).then(function(value) {
    if (value === USER_EXISTS) {
      // user exists, respond with json and do nothing else
      res.json({error: USER_EXISTS});
    } else {
      // get list of med pro codes
      var codes = value.codeList;
      var medicalCode ='';
      //check if medical pro exist in the db already
      do{
        medicalCode = 'MP'+randomstring.generate({
        length: 7,
        capitalization: 'uppercase'});
      }while(codes.indexOf(medicalCode) != -1);

      // med pro code was not found in db
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      // create user object with med pro role
      var newUser = createGenericUser(User, Security, Salt, req.body);
      var role = new MedicalProfessional(firstName, lastName, medicalCode);
      newUser.accountType = role;
      console.log(newUser.accountType);
      // put user in db
      userRepo.Create(newUser);
      res.json({success: true});
                
      }
    });
  });  
};


module.exports = api;