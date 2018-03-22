const config = require('@treatmentConfig');
const models = require('@treatment/app/setup');

module.exports = (app) => {
  const api = app.treatment_management.app.api.patient_interaction;

  // PUT /treatment_plan/api/patient_edit
  // Update patient input in treatment plan
  app.route(config.routes.patientUpdate).put(api.patientUpdate(models));

  // GET /treatment_plan/api/widgets
  // Get all widgets for patient
  app.route(config.routes.queryWidgets).put(api.queryWidgets(models));


  // TEMPORARY since there's no endpoint to create a widget
  // PUT /treatment_plan/api/create_widget
  app.route('treatment_plan/api/create_widget').put(api.createWidget(models));

}