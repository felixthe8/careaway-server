const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
  const api = app.account_management.app.api.patient;

  // POST /account/api/update-diagnosis
  // update diagnosis data for patient
  app.route(config.routes.updateDiagnosis).put(api.updateDiagnosis(models.UserRepo, models.DB));

}