const csrf = require('csrf');
const database = require('@dataAccess/db_connection');
const tokenRepository = require('@dataAccess/csrf_token_repository');

function CsrfValidation(req,res,next){
  new database().Connect().then(database => {
    var tokens = new csrf(); 
    var tRepo = new tokenRepository(database);
    var csrfToken = req.headers['x-csrf-token'];
    if(csrfToken){
      tRepo.findExistingToken(csrfToken).then(function(value){
        if (!tokens.verify(value.token.secret, value.token.value)) {
          res.statusCode(400);
          res.end();
        } else {
          next();
          }
        }, function(error){
          res.statusCode(400);
          res.end();
        });
      }
      else{
        res.statusCode(400);
        res.end();
      }
  });
};

function createCSRFToken (req,res,next) {
  new database().Connect().then(database => {
    var tokens = new csrf(); 
    var tRepo = new tokenRepository(database);
    var secret = tokens.secretSync();
    var token = tokens.create(secret);
    tRepo.addToken({"value" : token, "secret" : secret});
    req.csrfToken = token;
    next();
  });
};

module.exports = {createCSRFToken, CsrfValidation};