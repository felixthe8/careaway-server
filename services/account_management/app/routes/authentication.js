const config = require('@accountConfig');
const models = require('@account/app/setup');
const passport = require('passport');
//const pass = require('@account/app/setup/passport')(passport);
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  const api = app.account_management.app.api.authentication;

  passport.use(new LocalStrategy((username, password, done) => {
    console.log("running the strat");
    (api.login(models.UserRepo, models.DB, username, password)).then((result) => {
      if(result) return done(null, result);
      else return done(null, false);
      });
    }));
  // POST /account/api/authentication
  // authenticates user and determines account type
  app.route(config.routes.login).post(passport.authenticate('local'), (req, res) => {
    console.log("Sending");
    res.send({success: true});
  });
    
  // POST /account/api/validate-username
  // make sure username exists
  app.route(config.routes.validateUsername).post(api.validateUsername(models.UserRepo, models.DB));
    
  // GET /account/api/security-questions
  // query security questions for user
  app.route(config.routes.securityQuestions).get(api.securityQs(models.UserRepo, models.DB));
    
  // POST /account/api/validate-answers
  // validate security answers for user
  app.route(config.routes.validateAnswers).post(api.validateAs(models.UserRepo, models.DB));
    
  // PUT /account/api/reset-creds
  // reset credentials for user
  app.route(config.routes.resetCreds).put(api.resetCreds(models.UserRepo, models.DB));

}