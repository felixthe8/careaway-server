var CryptoJS = require('crypto-js');
const api = {};

//This authenticates the user with the received username and password from the client
api.login = (UserRepo, DB) => (req, res) => {
  // grab username and password from body
  const username = req.body.username;
  const password = req.body.password;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // find user in db
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user was not found
        res.json({error: 'User does not exist.'});
      } else {
        // user was found
        queriedUser = queriedUser[0];
        // hash password from request and compare with hashed password in db
        const passHashed = CryptoJS.HmacSHA256(password,queriedUser.identifier.salt).toString();
        if (passHashed === queriedUser.password) {
          if((Object.keys(queriedUser.accountType).length ===0)){
            //send a request telling client to register the user
            res.json({success: true, accountType: 'SSO'});
          } else{
            if (passHashed === queriedUser.password) {
              res.json({success: true, accountType: queriedUser.accountType.role});       
            } else {
               res.json({error: 'Wrong password.'})
            } 
          }
        } else {
          res.json({error: 'Wrong password.'})
          console.log("Wrong pass");

         }
       }
    });
  });
};
//This finds if the username inputted exist within the system
api.validateUsername = (UserRepo, DB) => (req, res) => {
    // grab username form body
    const username = req.body.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        // find user in db
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                // user was not found
                res.json({error: 'User does not exist.'});
            } else {
                // user was found
                res.json({success: true});
            }
            
        });
    });
}
//uses the username user inputted for resetting credentials
//and returns their list of security questions they
//selected during registration
api.securityQs = (UserRepo, DB) => (req, res) => {
  // grab username from query obj
  const username = req.query.username;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user was not found
        res.json({error: 'User does not exist.'});
      } else {
        // get security questions and put them in an array
        queriedUser = queriedUser[0];
        var userSecurity = queriedUser.security;
        var securityQs = [];
        for (var i=0;i<userSecurity.length;i++) {
          securityQs.push(userSecurity[i].securityQ);
        }
        // return array within json
        res.json({result: securityQs});
      }          
    });
  });
};
//Validates if the answers the user inputted are the same
//as the ones saved on the system
api.validateAs = (UserRepo, DB) => (req, res) => {
  // grab user and answers from body
  const username = req.body.username;
  const reqA1 = req.body.securityA1;
  const reqA2 = req.body.securityA2;
  const reqA3 = req.body.securityA3;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user not found
        res.json({error: 'User does not exist.'});
      } else {
        // get salts and hashed security answers
        queriedUser = queriedUser[0];
        var userSalts = queriedUser.identifier;
        var userSecurity = queriedUser.security;
        // hash answers from request with respective salts
        const hashedA1 = CryptoJS.HmacSHA256(reqA1,userSalts.saltA1).toString();
        const hashedA2 = CryptoJS.HmacSHA256(reqA2,userSalts.saltA2).toString();
        const hashedA3 = CryptoJS.HmacSHA256(reqA3,userSalts.saltA3).toString();
        // get the hashed answers from db
        const queriedA1 = userSecurity[0].securityA;
        const queriedA2 = userSecurity[1].securityA;
        const queriedA3 = userSecurity[2].securityA;
        // compare hashed answers
        if (hashedA1 === queriedA1 && hashedA2 === queriedA2 && hashedA3 === queriedA3) {
          res.json({success: true});
        } else {
          res.json({error: 'Wrong answers.'})
        }
      }
    });
  });
};
//This updates the user's password with the new password
//the user entered
api.resetCreds = (UserRepo, DB) => (req, res) => {
  // grab user and new password from body
  const username = req.body.username;
  const password = req.body.password;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user does not exist
        res.json({error: 'User does not exist.'});
      } else {
        // generate new salt and hash new password with new salt
        queriedUser = queriedUser[0];
        const newSalt = CryptoJS.lib.WordArray.random(128/8).toString();
        const passHashed = CryptoJS.HmacSHA256(password,newSalt).toString();
        // update db with new hashed password and salt
        userRepo.ResetCredential(username,passHashed,newSalt);
        res.json({success: true});
      }
    });
  });
};


module.exports = api;