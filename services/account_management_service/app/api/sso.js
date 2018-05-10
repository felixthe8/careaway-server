var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');
const api = {};
/**
 * 
 * @param {*} password 
 */
function getPasswordList(password){
  const passHashed = CryptoJS.SHA1(password).toString();
  const passPrefix = passHashed.substring(0,5);
  const passSuffix = passHashed.slice(5).toUpperCase();
  console.log("header:", passPrefix);
  console.log("suffix:", passSuffix, typeof(passSuffix));
  return requestPromise('https://api.pwnedpasswords.com/range/'+ passPrefix).then(body =>{
    var goodPasswordCheck = true;
    var i = 0;
    const hashList = body.split("\r\n");
    hashList.forEach(element => {
      if (element.split(":")[0]===passSuffix){
          goodPasswordCheck = false;
      };
    });
    return goodPasswordCheck;

  });

};
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
    const userRepo = new UserRepo(database);
    // Transfomer for the message received
    const transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.username && value.password && value.roleType){
        getPasswordList(req.body.password).then(body => {
          if(body){
            userRepo.FindUser(value.username).then(function(query){
              // Checks if the user does exist within our system
              if(query.User.length === 0){
                // If the user is new begin making a new salt and save the password and username into the database
                var saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
                // use value.password than saving it to a variable
                var passHashed = CryptoJS.HmacSHA256(value.password, saltStrPass).toString();
                // Saves all salt to an object
                var identifier = new Salt(saltStrPass);
                // Generates a new user using the received username and password from sso
                var newUser = new User.User(value.username, passHashed, {'role': 'SSO', 'roleType': value.roleType}, {}, identifier);
                userRepo.Create(newUser);
                // Return success message
                res.json({success: true});           
              } else {
                res.status(401);
                res.end();
              }
            });
          } else{
            res.json({error: "Bad Password"});
            res.end();
          }
      });
        // If the message was decoded successfully check if the username already exist in our system
        
      } else {
        // make this a variable at the end
        res.status(401); // Return a 401 bad request back to the sender
        res.end();
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
  //var token = req.headers.token;
  var token = req.body.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      // Checks if there were any errors during the message decoding
      if(value.username && value.password){
        userRepo.FindUser(value.username).then(function(query){
          // Gets the users queried for from the username
          var queriedUser = query.User;
          // Checks if a user was found
          if (queriedUser.length > 0) {
            // User was found
            var user = queriedUser[0];
            var salt = user.identifier.salt;
            // Hash password from request and compare with hashed password in db
            const passHashed = CryptoJS.HmacSHA256(value.password, salt).toString();
            // Checks if password matches with that in the database
            if (passHashed === user.password) {
              var loginInfo = transformer.createToken(value.username);
              if(user.accountType.role === "medical-professional"){
                res.writeHead(301,
                  {Location: 'https://careaway.me/#/MedicHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "patient"){
                res.writeHead(301,
                  {Location: 'https://careaway.me/#/PatientHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "system-admin"){
                res.writeHead(301,
                  {Location: 'https://careaway.me/#/AdminHome/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
              else if(user.accountType.role === "SSO"){
                res.writeHead(301,
                  {Location: 'https://careaway.me/#/Registration/'+ "?jwt="+loginInfo}
                );
                res.end();
              }
            } else {
              res.status(401);
              res.end();
            }
          } else {
            // User was not found
            res.status(401);
            res.end();            
          }
        });
      } else {
        res.status(401); // Return a 401 bad request back to the sender
        res.end();
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
      if(value.username && value.password) {
        // Finds the existing user in the database
        userRepo.FindUser(value.username).then(function(query){
          var queriedUser = query.User;
          if (queriedUser.length > 0) {
            var saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
            var passHashed = CryptoJS.HmacSHA256(value.password, saltStrPass).toString();
            // Update db with new hashed password and salt
            userRepo.ResetCredential(value.username, passHashed, saltStrPass);
            res.json({success: true});
          } else {
            // User does not exist return an error or token didn't have all information
            res.status(401);
            res.end();            
          }
        });
      } else {
        res.status(401); // Return a 401 bad request back to the sender
        res.end();
      } 
    });
  });
 };

/**
 * This provides the client the information needed for the user to log into SSO
 * @param {*} UserRepo is the user repository to create and get users
 * @param {*} DB the database connection
 * @param {*} Transformer the JWT decoder
 * @returns {*} The username, accountType, cookie, and csurfToken
 */
api.getLoginInfo = (UserRepo, DB,Transformer) => (req, res) => {
  // The message received from the third party service
  var token = req.query.token;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    // Transfomer for the message received
    var transformer = new Transformer(database);
    // This morphs the message received to a generic user object for our system
    transformer.decodeJWT(token).then(function(value){
      userRepo.FindUser(value.username).then(function(value){
        var user = value.User[0];       
        const obj = {csrfToken : req.query.csrfToken, username : user.username, role : user.accountType.role, 'cookie': user._id};
        res.json(obj);
    });
  });
});
};

module.exports = api;