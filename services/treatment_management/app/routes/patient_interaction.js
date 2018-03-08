const config = require('@treatmentConfig');
const models = require('@treatment/app/setup');

module.exports = (app) => {
  const api = app.treatment_management.app.api.patient_interaction;

  // PUT /treatment_plan/api/patient_edit
  // authenticates user and determines account type
  app.route(config.routes.patientUpdate).put(api.patientUpdateMeter(models));

}