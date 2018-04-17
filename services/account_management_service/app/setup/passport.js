const LocalStrategy = require('passport-local').Strategy;
const models = require('@accountModels');
const CryptoJS = require('crypto-js');
const request = require('request');
const passport = require('passport');
const service = {};
const UserRepo = models.UserRepo;
const DB = models.DB;

var randomstring = require('randomstring');
module.exports = () => {
  // Serializes an authenticated user.
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  function getPasswordList(password){

    const passHashed = CryptoJS.SHA1(password).toString();
    const passPrefix = passHashed.substring(0,5);
    const passSuffix = passHashed.slice(5);
    var goodPasswordCheck = false;
    console.log("header:", passPrefix);
    console.log("suffix:", passSuffix, typeof(passSuffix));
    request.get('https://api.pwnedpasswords.com/range/'+ passPrefix,function(error,response,body){
  
      console.log('statusCode', response && response.statusCode);
      const hashList = body.split("\r\n");
      hashList.forEach(element => {
        if (element.split(":")[0]===passSuffix){
            console.log(passSuffix);
            return goodPasswordCheck;
        };
      });

    });

  };
  
  // Deserializes a user. Never used??
  passport.deserializeUser((id, done) => {
    DB.then(database => {
      const repo = new UserRepo(database);
      repo.findUser(id).then(user => {
        done(null, user.User);
      });
    });
  });

  passport.use('local-login', 
    new LocalStrategy({
      username: 'username', 
      password: 'password', 
      passReqToCallback: true}, 
    (req, username, password, done) => {
      DB.then(database => {
        var userRepo = new UserRepo(database);
        // find user in db
        userRepo.FindUser(username).then(function(value){
          var queriedUser = value.User;
          if (queriedUser.length === 0) {
            // user was not found
            return done(null, false, {error: 'User does not exist.'});
          } else {
            // user was found
            queriedUser = queriedUser[0];
            // hash password from request and compare with hashed password in db
            const passHashed = CryptoJS.HmacSHA256(password,queriedUser.identifier.salt).toString();
            if (passHashed === queriedUser.password) { 
              // The passwords match.
              if((Object.keys(queriedUser.accountType).length === 0)){
                //send a request telling client to register the user since it's an account from the SSO.
                return done(null, true, {success: true, accountType: 'SSO'});
              } else { 
                // This user has completed their registration, and their password is correct.
                return done(null, true,{success: true, accountType: queriedUser.accountType.role, user: queriedUser._id});
              }
            } else {
              // Invalid password.
              return done(null, false, {error: 'Wrong password.'})
            }
          }
        });
      });
  }));
  
  const verifyUsername = (username) => {
    return new Promise((fulfill, reject) => {
      DB.then(database => {
        const userRepo = new UserRepo(database);
        // find user in db
        userRepo.FindUser(username).then(value => {
          const users = value.User;
          const exists = users.length > 0;
          fulfill({repo: userRepo, exists: exists});
        });
      });
    });
  }
  const registerPatient = (codes, userRepo, req, User, done) => {
    return new Promise((fulfill, reject) => {
      const Patient = models.Patient;
      const Security = models.Security;
      const Salt = models.Salt;
      // Test if patient's medical code is valid
      const medicalCode = req.body.medicalCode;
      if(codes.indexOf(medicalCode) === -1) {
        // med pro code from request was not found in db
        fulfill({success: false, error: 'Medical professional code does not exist.'});
      } else {
        // med pro code was found in db
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        // create user object with patient role

        var newUser = User.createGenericUser(Security, Salt, req.body);
        var role = new Patient(firstName, lastName, medicalCode);
        newUser.accountType = role;
        // put user in db
        userRepo.Create(newUser).then(res => {
          userRepo.FindUser(newUser.username).then(result => {
            const id = result.User[0]._id;
            fulfill({success: true, user: id});
          });
        })
      }
    })
    
  }
  const registerMedicalProfessional = (codes, userRepo, req, User, done) => {
    return new Promise((fulfill, reject) => {
      const MedicalProfessional = models.MedicalProfessional;
      const Security = models.Security;
      const Salt = models.Salt;
      // Generate med pro code 
      let medicalCode = "";
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
      var newUser = User.createGenericUser(Security, Salt, req.body);
  
      var role = new MedicalProfessional(firstName, lastName, medicalCode);
      
      newUser.accountType = role;
      // put user in db
      if(getPasswordList(req.body.password)){
      userRepo.Create(newUser).then(res => {
        userRepo.FindUser(newUser.username).then(result => {
          const id = result.User[0]._id;
          fulfill({success: true, user: id});
        })
      })
    }else{
      fulfill({"Bad-Password":true});
    }
    });
    
  }
  passport.use('local-registration', new LocalStrategy({
    username: 'username', 
    password: 'password', 
    passReqToCallback: true
  },(req, username, password, done) => {
    // const string to return and compare to
    const USER_EXISTS = 'Username already exists.';

    const User = models.User;
    verifyUsername(username).then(result => {

      if(result.exists) {
        return done(null, false, {error: USER_EXISTS});
      } else {
        const userRepo = result.repo;

        // username doesn't exist yet, query medical codes
        userRepo.GetMedicalCodes().then(value => {
          const codes = value.codeList;
          
          if(req.body.patient) {
            // Register patient
            registerPatient(codes, userRepo, req, User).then(result => {
              console.log("Completely done");
              done(null, result.success, result);
            });
          } else {
            // Register medical professional
            registerMedicalProfessional(codes, userRepo, req, User, done).then(result => {
              console.log("Completely done");
              done(null, result.success, result);
            });
          }
        });
      }
    });  
  }));
  return passport;
}
