const LocalStrategy = require('passport-local').Strategy;
const api = require('@account/app/api/authentication');
const models = require('@accountModels');
var CryptoJS = require('crypto-js');
const passport = require('passport');
module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("Serialize " + done.toString());
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, user);
  });

  passport.use('local-login', 
    new LocalStrategy({
      username: 'username', 
      password: 'password', 
      passReqToCallback: true}, 
    (req, username, password, done) => {
      const UserRepo = models.UserRepo;
      const DB = models.DB;
      console.log(done.toString());
      DB.then(database => {
        
        var userRepo = new UserRepo(database);
        
        // find user in db
        userRepo.FindUser(username).then(function(value){
          
          var queriedUser = value.User;
          if (queriedUser.length === 0) {
            console.log("Invalid username. ");
            // user was not found
            return done(null, false, {error: 'User does not exist.'});
          } else {
            console.log("Valid username.");
            // user was found
            queriedUser = queriedUser[0];

            // hash password from request and compare with hashed password in db
            const passHashed = CryptoJS.HmacSHA256(password,queriedUser.identifier.salt).toString();

            if (passHashed === queriedUser.password) {
              console.log("Valid password");
              if((Object.keys(queriedUser.accountType).length ===0)){
                console.log("SSO user");
                //send a request telling client to register the user
                return done(null, true, {success: true, accountType: 'SSO'});
              } else{
                if (passHashed === queriedUser.password) {
                  console.log("Valid username and pass.");
                  return done(null, true,{success: true, accountType: queriedUser.accountType.role, user: queriedUser.username});       
                } else {
                  console.log("Wrong password but valid username.");
                  return done(null, false, {error: 'Wrong password.'})
                } 
              }
            } else {
              console.log("Wrong pass");
              return done(null, false, {error: 'Wrong password.'})
            }
          }
        });
      });
  }));
  return passport;
}
/* const pass = {}

pass.authentication = (passport) => (req, res, next) => {
  
  console.log("in passport authentication");
}
module.exports = pass; */
