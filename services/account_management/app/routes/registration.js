const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.registration;

    // POST /account/api/registration/patient
    // register new patient
    app.route(config.routes.registerPatient).post(api.registerPatient(models.Patient, models.db));

    // POST /account/api/registration/medical-professional
    // register new med pro
    app.route(config.routes.registerMedpro).post(api.registerMedpro(models.MedicalProfessional, models.db));
}