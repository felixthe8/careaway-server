const config = require('@treatmentConfig');

const models = require('@account/app/setup');

module.exports = (app) => {
  const api = app.treatment_management.app.api.treatment_creator;
  app.route(config.routes.create).post(api.create());
  // app.route(config.routes.getPatients).get(api.getPatients(models.UserRepo, models.DB));
  app.route(config.routes.returnCode).get(api.returnCode(models.UserRepo, models.DB));
}