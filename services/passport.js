const LocalStrategy = require('passport-local').Strategy;
const api = require('@account/app/api/authentication');
const models = require('@accountModels');
var CryptoJS = require('crypto-js');
const passport = require('passport');
const service = {};
const UserRepo = models.UserRepo;
const DB = models.DB;

var randomstring = require('randomstring');
service.run = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

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
              if((Object.keys(queriedUser.accountType).length ===0)){
                //send a request telling client to register the user
                return done(null, true, {success: true, accountType: 'SSO'});
              } else{
                if (passHashed === queriedUser.password) {
                  return done(null, true,{success: true, accountType: queriedUser.accountType.role, user: queriedUser._id});       
                } else {
                  return done(null, false, {error: 'Wrong password.'})
                } 
              }
            } else {
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
        userRepo.FindUser(username).then(value => {
          const users = value.User;
          const exists = users.length > 0;
          fulfill({repo: userRepo, exists: exists});
        });
      });
    });
  }
  const registerPatient = (codes, userRepo, req, User, done) => {
    const Patient = models.Patient;
    const Security = models.Security;
    const Salt = models.Salt;
    
    // Test if patient's medical code is valid
    const medicalCode = req.body.medicalCode;
    if(codes.indexOf(medicalCode) === -1) {
      // med pro code from request was not found in db
      return done(null, false, {error: 'Medical professional code does not exist.'});
    } else {
      // med pro code was found in db
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      // create user object with patient role
      var newUser = User.createGenericUser(Security, Salt, req.body);
      var role = new Patient(firstName, lastName, medicalCode);
      newUser.accountType = role;
      // put user in db
      userRepo.Create(newUser);
      userRepo.FindUser(newUser.username).then(result => {
        const id = result.User[0]._id;
        return done(null, true, {success: true, user: id});
      })
    }
  }
  const registerMedicalProfessional = (codes, userRepo, req, User, done) => {
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
    userRepo.Create(newUser);
    userRepo.FindUser(newUser.username).then(result => {
      const id = result.User[0]._id;
      return done(null, true, {success: true, user: id});
    })
  
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
            registerPatient(codes, userRepo, req, User, done)
          } else {
            // Register medical professional
            registerMedicalProfessional(codes, userRepo, req, User, done);
          }
        });
      }
    });  
  }));
  return passport;
}
const validate = (id) => {
  return new Promise((fulfill, reject) => {
    DB.then(database => {
      const repo = new UserRepo(database);
      repo.FindUserById(id).then(user => {
        const theUser = user.User;
        // If the query returns at least one user, then success.
        if(theUser && theUser.length > 0) {
          fulfill({success: true, user: theUser[0]});
        } else {
          // No user with this ID, not a valid user.
          fulfill({success: false});
        } 
      });
    });
  });
}
/**
 * Validates whether or not this user is authenticated.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
service.isAuthenticated = (req, res, next) => {
  if(req.cookies) {
    const user = req.cookies.user;
    // Tests for the user cookie.
    if(user) {
      // Validates whether this is actually a user id in our system.
      validate(user).then(valid => {
        //console.log(valid);
        if(valid.success) {
          // Valid user, lets their request move through the rest our routes
          next();
        } else {
          // Ends their request here, only a valid user can access the rest of the routes.
          res.end();
        }
      });
    } else {
      // Ends their request here, only an authenticated user can access the remaining routes.
      res.end();
    }
  } else {
    // Ends their request here, only an authenticated user can access the remaining routes.
    res.end();
  }
}
service.logout = (req, res, next) => {
  if(req.cookies) {
    const user = req.cookies.user;
    if(user) {
      res.clearCookie(user);
      res.end();
    } else {
      res.end();
    }
  } else {
    res.end();
  }
}
module.exports = service;
