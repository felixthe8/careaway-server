const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    // POST /account/api/authentication
    // authenticates user and determines account type
    app.route(config.routes.login).post(api.login(models.Patient, models.MedicalProfessional, models.SystemAdmin, models.db));
    
    // PUT /account/api/reset-creds
    // reset credentials for user
    app.route(config.routes.resetCreds).put(api.resetCreds(models.Patient, models.MedicalProfessional, models.db));

    // GET /
    // test server
    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });
    
}