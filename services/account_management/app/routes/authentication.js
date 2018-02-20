const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    // POST /account/api/authentication
    // authenticates user and determines account type
    app.route(config.routes.login).post(api.login(models.UserRepo, models.DB));
    
    // POST /account/api/validate-username
    // make sure username exists
    app.route(config.routes.validateUsername).post(api.validateUsername(models.UserRepo, models.DB));
    
    // GET /account/api/security-questions
    // reset credentials for user
    app.route(config.routes.securityQuestions).get(api.securityQs(models.UserRepo, models.DB));
    
    // POST /account/api/validate-answers
    // reset credentials for user
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