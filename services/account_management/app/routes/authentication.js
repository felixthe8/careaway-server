const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    // POST /account/api/authentication
    // authenticates user and determines account type
    app.route(config.routes.login).post(api.login(models.UserRepo, models.DB));
    
    // POST /account/api/validate-username
    // make sure username exists
    app.route(config.routes.validateUsername).post(api.validateUsername(models.Patient, models.MedicalProfessional, models.db));
    
    // GET /account/api/security-questions
    // reset credentials for user
    app.route(config.routes.securityQuestions).get(api.securityQs(models.Patient, models.MedicalProfessional, models.db));
    
    // POST /account/api/validate-answers
    // reset credentials for user
    app.route(config.routes.validateAnswers).post(api.validateAs(models.Patient, models.MedicalProfessional, models.db));
    
    // PUT /account/api/reset-creds
    // reset credentials for user
    app.route(config.routes.resetCreds).put(api.resetCreds(models.Patient, models.MedicalProfessional, models.db));

    // GET /
    // test server
    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });
    
}