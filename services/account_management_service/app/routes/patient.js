const config = require('@accountConfig');
const models = require('@accountModels');
const api = require('@accountAPI/patient');

module.exports = (app) => {

  // POST /account/api/update-diagnosis
  // update diagnosis data for patient
  app.route(config.routes.updateDiagnosis).put(api.updateDiagnosis(models.UserRepo, models.DB));

}