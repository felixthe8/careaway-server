const config = require('@accountConfig');
const models = require('@account/app/setup');
module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    app.route(config.routes.login).post(api.login(models.Patient, models.MedicalProfessional, models.SystemAdmin, models.db));
    app.route(config.routes.resetCreds).put(api.resetCreds(models.Patient, models.MedicalProfessional, models.db));

    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });

    app.route('/query-all-patients').get(api.getPatients(models.Patient, models.db));
}