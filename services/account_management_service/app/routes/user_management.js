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
  // Creating or updating a Medical Professional transfer.
  app.route(config.routes.mpTransfer).post(api.mpTransfer(models.UserRepo, models.TransferRepo, models.DB));

  // TODO: put in config server routes (config and account)
  // GET
  // Removes the mp transfer request.
  app.route(config.routes.removeTransfer).get(api.removeMpTransfer(models.TransferRepo, models.DB));

  // POST
  // Acceptance of mp transfer, then removes that mp transfer request.
  app.route(config.routes.acceptTransfer).post(api.acceptTransfer(models.UserRepo, models.DB), api.removeMpTransfer(models.TransferRepo, models.DB));
}