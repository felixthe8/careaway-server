var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const api = {};
// Register a new user from sso into the careaway system
api.ssoRegistration = (User,Salt,UserRepo,DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.body.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.err){
        console.log(value.err);
        res.status(400); // Return a 400 bad request back to the sender
        res.json({'err': value});
      } else {
        var username = value.username;
        var password = value.password;
        var roleType = value.roleType;
        // If the message was decoded successfully check if the username already exist in our system
        userRepo.FindUser(value.username).then(function(value){
          // Checks if the user does exist within our system
          if(value.User.length > 0){
            console.log('User already exist in our system');
            res.status(400);
            res.json({'err' : 'User already exist'});
          } else {
            // If the user is new begin making a new salt and save the password and username into the database
            var saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
            var passHashed = CryptoJS.HmacSHA256(password, saltStrPass).toString();
            // Saves all salt to an object
            var identifier = new Salt(saltStrPass);
            // Generates a new user using the received username and password from sso
            var newUser = new User(username,passHashed, {'role': 'SSO', 'roleType': roleType}, {} ,identifier);
            userRepo.Create(newUser);
            // Return success message
            res.json({success: true});
          }
        });
      }
    });
  });
}
// Authenticates the SSO user into our careaway system
api.ssoLogin = (UserRepo, DB,Transformer) => (req, res) => {
       // The message received from the third party service
  var token = req.body.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.err){
        console.log(value.err);
        res.status(400); // Return a 400 bad request back to the sender
        res.json({'err': value});
      } else {
        var username = value.username;
        var password = value.password;
        userRepo.FindUser(username).then(function(value){
          // Gets the users queried for from the username
          var queriedUser = value.User;
          // Checks if a user was found
          if (queriedUser.length === 0) {
            // User was not found
            res.status(400)
            res.json({error: 'User does not exist.'});
          } else {
            // User was found
            var user = queriedUser[0];
            var salt = user.identifier.salt;
            // Hash password from request and compare with hashed password in db
            const passHashed = CryptoJS.HmacSHA256(password,salt).toString();
            // Checks if password matches with that in the database
            if (passHashed === user.password) {
              //TODO: SERVE UP CORRECT FILE TO SSO
              console.log("LOG THEM IN");
            } else {
              // res.json({error: 'Wrong password.'})
              console.log("Wrong pass");
              res.status(400);
              res.json({error: 'Password was incorrect'});     
            }
          }
        });
      }
    });
  });
};
//  This Edits an existing user's password into our system
api.ssoResetPassword= (UserRepo, DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.body.token;
  console.log(token);
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.err){
        console.log(value.err);
        res.status(400); // Return a 400 bad request back to the sender
        res.json({'err': value});
      } else {
        var username = value.username;
        var password = value.password;
        // Finds the existing user in the database
        userRepo.FindUser(username).then(function(value){
          var queriedUser = value.User;
          console.log(queriedUser);
          if (queriedUser.length === 0) {
            // User does not exist return an error
            res.status(400);
            res.json({'err' : 'User does not exist'});
          } else {
            var saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
            var passHashed = CryptoJS.HmacSHA256(password, saltStrPass).toString();
            // Update db with new hashed password and salt
            userRepo.ResetCredential(username,passHashed,saltStrPass);
            res.status(200);
            res.json({success: true});
          }
        });
      }
    });
  });
};

module.exports = api;