const config = require('@accountConfig');
const models = require('@accountModels');
const api = require('@accountAPI/user_management');

module.exports = (app) => {

  // GET /account/api/get-user
  app.route(config.routes.getUser).get(api.getUser(models.UserRepo, models.DB));

  // GET /account/api/get-all-patients
  app.route(config.routes.getPatients).get(api.getAllPatients(models.UserRepo, models.DB));

  // GET /account/api/get-patient-appointment-info
  app.route(config.routes.getAllInfoForPatientAppointment).get(api.getAppointmentPatientInfo(models.UserRepo, models.DB));

  // GET
  app.route(config.routes.returnCode).get(api.returnCode(models.UserRepo, models.DB));

  // POST 
  // New mp request
  app.route(config.routes.newMpRequest).post(api.newMpRequest);

  // PUT
  // Modifying the original change mp request.
  app.route(config.routes.modifyMpRequest).put(api.modifyNewMpRequest);
}