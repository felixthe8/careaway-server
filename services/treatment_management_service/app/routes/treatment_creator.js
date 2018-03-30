const config = require('@treatmentConfig');
const models = require('@treatmentModels');
const api = require('@treatmentAPI/treatment_creator');
module.exports = (app) => {
  app.route(config.routes.create).post(api.create());
  app.route(config.routes.getDiagnosisList).get(api.getDiagnosisList(models.TreatmentRepo, models.DB));

  app.route(config.routes.createTreatmentMeter).post(api.createTreatmentMeter(models.UserRepo, models.DB));
  app.route(config.routes.createTreatmentChecklist).post(api.createTreatmentChecklist(models.UserRepo, models.DB));
}
