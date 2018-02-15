const config = require('@accountConfig');
const models = require('@account/app/setup');
module.exports = (app) => {
    const api = app.account_management.app.api.registration;

    app.route(config.routes.registerPatient).post(api.registerPatient(models.Patient, models.db));
    app.route(config.routes.registerMedpro).post(api.registerMedpro(models.MedicalProfessional, models.db));
}