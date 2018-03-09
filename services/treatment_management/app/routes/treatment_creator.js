const config = require('@treatmentConfig');

const models = require('@treatment/app/setup');

module.exports = (app) => {
  const api = app.treatment_management.app.api.treatment_creator;
  app.route(config.routes.create).post(api.create());
  app.route(config.routes.returnCode).get(api.returnCode(models.UserRepo, models.DB));
}