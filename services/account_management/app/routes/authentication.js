const config = require('@accountConfig');
const models = require('@accountModels');

module.exports = (app) => {
    const api = app.account_management.app.api.authentication;
    const passport = app.passport;

    // POST /account/api/authentication
    // authenticates user and determines account type
    app.route(config.routes.login).post((req, res, next) => {
      passport.authenticate('local-login', (err, success, message) => {
        req.login(message.user, (err) => {
          if(err) {
            console.log(`Error in login ${err}`);
            res.end();
          } else {
            //res.cookie('authenticated', req.session);
            message.cookie = req.session.passport.user;
            res.json(message);
            res.end();
          }
          
        });
      })(req, res, next);
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

    // GET /
    // test server
    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });
}