const config = require('@accountConfig');
const models = require('@accountModels');

module.exports = (app) => {
  const api = app.account_management.app.api.user_management;

  // GET /account/api/get-user
  app.route(config.routes.getUser).get(api.getUser(models.UserRepo, models.DB));

  // GET /account/api/get-all-patients
  app.route(config.routes.getPatients).get(api.getAllPatients(models.UserRepo, models.DB));

  // GET /account/api/get-patient-appointment-info
  app.route(config.routes.getAllInfoForPatientAppointment).get(api.getAppointmentPatientInfo(models.UserRepo, models.DB));
}