var jwt = require('jsonwebtoken');
var tokenRepository = require('./data_access/token_repository');
/**
 * This is the constructor for the Transform Class
 * This will hold any logic to transform any message received to the 
 * appropriate object type that is needed in our system
 * @param {*} dbConnection the mongodb connection string
 */
function Transformer(dbConnection) {
  this.db = dbConnection;
}
/**
 * A method to handle any custom error that is outputed when a rejected request is made by a promise
 */
process.on('unhandledRejection', error => {
  // Displays if it has received a bad request from a promise
  console.log('Bad Request', error);
});
/**
 * This converts the JWT object received into a generic object
 * @param {*} token is the JWT that was received
 * @returns {*} a promise that returns the generic user object or an error of the received message 
 */
Transformer.prototype.decodeJWT = function(token) {
  var tokenRepo = new tokenRepository(this.db);
  return new Promise(function(fullfill,reject) { 
    // Checks if the JWT was already sent to our system
    tokenRepo.findExistingToken(token).then(function(value) {
      // If the JWT does not exist then add it into the database
      if(value === false) {
        tokenRepo.addToken(token);
        try {  
          // This verifies if JWT has not been tampered with and checks if the JWT has expired (if it has the exp value)
          var verified = jwt.verify(token,"db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==");
          // This decodes the JWT into the orginal JSON object if the JWT was verified
          var decoded = jwt.decode(token,{complete: true});
          // Get's the intended application name
          var applicationName = decoded.payload.application;
          // Checks if the JWT has an exp value or if the JWT was meant for careaway
          if(applicationName === 'careaway' || applicationName === undefined){
            // Create the generic user information
            var newUser = decoded.payload;
            // Return back the new user
            fullfill(newUser);
          } else {
            fullfill({'err':'JWT has expired or JWT not meant for CareAway'});
          }
        } catch(err) {
          console.log(err);
          reject(err);
        }
      } else{
        fullfill({'err':'JWT already exist in CareAway'});
      }
    });
  }
);};

Transformer.prototype.createToken = function(username){
  var newJWT = jwt.sign({"username" : username},"db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==");
  return newJWT;
}
module.exports = Transformer;