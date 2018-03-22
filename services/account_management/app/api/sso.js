var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const api = {};

/**
 * Register a new user from third party source into the careaway system
 * @param {*} User is the model of the user in the careaway system
 * @param {*} Salt the model identifier that contains the salt for the password
 * @param {*} UserRepo the data access repository for users
 * @param {*} DB the database connection
 * @param {*} Transformer the object that contains the logic to transform the message
 * @return {*} A status code and a object containing a success or error message
 */
api.ssoRegistration = (User,Salt,UserRepo,DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.headers.token;
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
};

/**
 * Check's incoming login credentials from third party source
 * @param {*} UserRepo the data access repository for users
 * @param {*} DB the database connection
 * @param {*} Transformer the object that contains the logic to transform the message
 * @return {*} A status code and a file containing the login account type the user is accessing
 */
api.ssoLogin = (UserRepo, DB,Transformer) => (req, res) => {
  // The message received from the third party service
  // var token = req.headers.token;
  var obj = Object.keys(req.body)[0];
  var token = JSON.parse(obj).token;
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
          console.log(queriedUser);
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
              var loginInfo = transformer.createToken(username);
              if(user.accountType.role === "medical-professional"){
                res.writeHead(301,
                  {Location: 'http://localhost:8081/MedicHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "patient"){
                res.writeHead(301,
                  {Location: 'http://localhost:8081/PatientHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "system-admin"){
                res.writeHead(301,
                  {Location: 'http://localhost:8081/AdminHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "SSO"){
                res.writeHead(301,
                  {Location: 'http://localhost:8081/Registration/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
            } else {
              res.status(400);
              res.json({error: 'Password was incorrect'});     
            }
          }
        });
      }
    });
  });
};
/**
 * This Edits an existing user's password into our system
 * @param {*} UserRepo the data access repository for users
 * @param {*} DB the database connection
 * @param {*} Transformer the object that contains the logic to transform the message
 * @return {*} A status code and a object containing a success or error message
 */
api.ssoResetPassword= (UserRepo, DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.headers.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.err) {
        res.status(400); // Return a 400 bad request back to the sender
        res.json({'err': value}); 
      } else {
        var username = value.username;
        var password = value.password;
        // Finds the existing user in the database
        userRepo.FindUser(username).then(function(value){
          var queriedUser = value.User;
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


api.getLoginInfo = (UserRepo, DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.query.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      var username = value.username;
      userRepo.FindUser(username).then(function(value){
        var user = value.User[0];       
        const obj = {csrfToken : req.query.csrfToken, username : user.username, role : user.accountType.role, 'cookie': user._id};
        console.log(JSON.stringify(obj));
        res.json(obj);
    });
  });
});
}

module.exports = api;